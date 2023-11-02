import { BrowserWindow, ipcMain } from 'electron';
import { PipelinesMap } from '../../globalTypes';
import { SubscribeRequest, UnsubscribeRequest } from '../types';

import { pipelineAlreadyRegistered } from './utils/pipelineAlreadyRegistered';
import { findTargetId } from './utils/findTargetId';
import { factoryPipelineMap } from './utils/factoryPipelineMap';
import { ApiService } from './ApiService';
import { DataBridge } from './DataBridge';
import { BadgeManager } from './BadgeManager';
import { StateManager } from '../StateManager';

export class AppManager extends StateManager {
  readonly mainWindow: BrowserWindow;
  public readonly projects: string[];
  readonly activePipelinesMap: PipelinesMap;
  readonly completedPipelinesMap: PipelinesMap;
  readonly updatedPipelinesMap: PipelinesMap;
  private readonly apiService: ApiService;
  private bridge: DataBridge;
  private badgeManager: BadgeManager;

  constructor(mainWindow: BrowserWindow) {
    super();

    this.mainWindow = mainWindow;
    this.projects = ['11', '22', '33'];
    this.activePipelinesMap = factoryPipelineMap(this.projects);
    this.completedPipelinesMap = factoryPipelineMap(this.projects);
    this.updatedPipelinesMap = factoryPipelineMap(this.projects);

    this.apiService = new ApiService(
      this.activePipelinesMap,
      this.completedPipelinesMap,
      this.updatedPipelinesMap
    );

    this.bridge = new DataBridge(this);
    this.badgeManager = new BadgeManager(this);

    this.bridge.listen();
    this.badgeManager.listen();
  }

  async subscribe(request: SubscribeRequest): Promise<void> {
    const { projectId, pipelineId } = request;
    const referenceToCompleted = this.completedPipelinesMap[projectId];
    const referenceToActive = this.activePipelinesMap[projectId];

    if (
      pipelineAlreadyRegistered(pipelineId, referenceToCompleted) ||
      pipelineAlreadyRegistered(pipelineId, referenceToActive)
    ) {
      return;
    }

    await this.apiService.register(request);

    this.bridge.message('pipeline:subscriptions');
  }

  unsubscribe(request: UnsubscribeRequest) {
    const { projectId, pipelineId, completed } = request;
    const pipelineType = completed ? 'completedPipelinesMap' : 'activePipelinesMap';
    const pipelines = this[pipelineType][projectId];
    const removeTargetId = findTargetId(pipelineId, pipelines);

    // TODO: handle -1 case of the "removeTargetId"
    this[pipelineType][projectId].splice(removeTargetId, 1);

    this.bridge.message('pipeline:subscriptions');
  }

  async watch() {
    const updatePromises = this.projects.map((project) => {
      return this.apiService.update({ projectId: Number(project) });
    });

    await Promise.all(updatePromises);

    this.bridge.message('pipeline:update');
    this.badgeManager.setBadges();
  }

  init() {
    this.mainWindow.on('focus', () => {
      this.setWindowFocusState({ payload: true });
    });

    this.mainWindow.on('blur', () => {
      this.setWindowFocusState({ payload: false });
    });

    ipcMain.on('pipeline:subscribe', async (_, payload: SubscribeRequest) => {
      await this.subscribe(payload);
    });

    ipcMain.on('debug:manual-fetch', async () => {
      await this.watch();
    });

    ipcMain.on('pipeline:unsubscribe', (_, payload: UnsubscribeRequest) => {
      this.unsubscribe(payload);
    });

    ipcMain.on('ui:accordion-status', (_, payload) => {
      const { id, expanded } = payload;

      this.setProjectState({ target: id, payload: expanded ? 'expanded' : 'collapsed' });
    });
  }
}
