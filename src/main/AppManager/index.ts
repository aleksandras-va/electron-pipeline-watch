import { BrowserWindow } from 'electron';
import { PipelinesMap } from '../../globalTypes';
import { SubscribeRequest, UnsubscribeRequest } from '../types';
import { findTargetId, pipelineAlreadyRegistered } from './utils';
import { ApiService } from '../ApiService';
import { DataBridge } from '../DataBridge';

export class AppManager {
  readonly mainWindow: BrowserWindow;
  private readonly projects: string[];
  readonly activePipelinesMap: PipelinesMap;
  // private readonly updatedPipelinesMap: PipelinesMap;
  readonly completedPipelinesMap: PipelinesMap;
  private readonly apiService: ApiService;
  private bridge: DataBridge;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
    this.projects = ['11', '22', '33'];
    this.activePipelinesMap = { '11': [], '22': [], '33': [] };
    // this.updatedPipelinesMap = { '11': [], '22': [], '33': [] };
    this.completedPipelinesMap = { '11': [], '22': [], '33': [] };

    this.apiService = new ApiService(this.activePipelinesMap, this.completedPipelinesMap);
    this.bridge = new DataBridge(this);
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
  }
}
