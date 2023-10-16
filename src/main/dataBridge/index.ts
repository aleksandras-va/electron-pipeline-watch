import type { App, BrowserWindow } from 'electron';
import type { SubscribeRequest, UnsubscribeRequest } from '../types';
import type { BridgeList, Pipeline, PipelinePayload } from '../../globalTypes';
import { findTargetId, handleFetch } from './utils';

export interface IDataBridge {
  getBridge(): BridgeList;
  watch(): Promise<void>;
  subscribe(subscribeRequest: SubscribeRequest): Promise<void>;
  unsubscribe(subscribeRequest: SubscribeRequest): Promise<void>;
}

export class DataBridge implements IDataBridge {
  private readonly app: App;
  private readonly mainWindow: BrowserWindow;
  private readonly activePipelines: BridgeList;
  private readonly completedPipelines: BridgeList;

  constructor(app, mainWindow: BrowserWindow) {
    this.app = app;
    this.mainWindow = mainWindow;
    this.activePipelines = {};
    this.completedPipelines = {};
  }

  getBridge() {
    return this.activePipelines;
  }

  async watch() {
    // setInterval(async () => {
    const projectsList = Object.keys(this.activePipelines);

    // TODO: If there are no active pipelines, don't fetch.

    const featPromises = projectsList.map(async (projectId): Promise<Pipeline[]> => {
      return handleFetch<Pipeline[]>(`http://localhost:3002/v2/${projectId}/pipelines/`);
    });

    const results = await Promise.all(featPromises);
    const mappedResults: Map<number, Record<string, Pipeline>> = new Map();

    results.flat().forEach((pipeline) => {
      const projectId = pipeline.project_id;

      let projectsPipelines = mappedResults.get(projectId);

      if (!projectsPipelines) {
        projectsPipelines = {};
        mappedResults.set(projectId, projectsPipelines);
      }

      projectsPipelines[pipeline.id] = pipeline;
    });

    // Update the bridgeList with new data
    Object.entries(this.activePipelines).forEach(([projectId, pipelines]) => {
      const projectIdNumber = Number(projectId);
      const updatedData = mappedResults.get(projectIdNumber);
      const completedIndexes: number[] = [];

      // Loop through each pipeline
      pipelines.forEach((pipeline, index) => {
        const updatedStatus = updatedData![pipeline.id].status;

        if (updatedStatus !== 'running') {
          if (!this.completedPipelines.hasOwnProperty(projectIdNumber)) {
            this.completedPipelines[projectIdNumber] = [];
          }

          this.completedPipelines[projectIdNumber].push(pipeline);
          completedIndexes.push(index);
        }
        pipeline.status = updatedStatus;
        pipeline.data = updatedData![pipeline.id].data;
      });

      const currentBadgeCount = this.app.getBadgeCount();

      this.app.setBadgeCount(currentBadgeCount + completedIndexes.length);

      // Delete completed pipelines from the "active" list
      completedIndexes.forEach((pipelineIndex) => {
        pipelines.splice(pipelineIndex, 1);
      });
    });

    const payload: PipelinePayload = {
      active: this.activePipelines,
      completed: this.completedPipelines,
    } as const;

    this.mainWindow.webContents.send('pipeline:update', payload);
    // }, 5000);
  }

  async subscribe(request: SubscribeRequest) {
    const { projectId, pipelineId } = request;
    const alreadyExists = (pipeline: Pipeline) => pipeline.id === pipelineId;

    if (!this.activePipelines.hasOwnProperty(projectId)) {
      this.activePipelines[projectId] = [];
    } else if (
      // TODO: refactor
      this.activePipelines[projectId].some(alreadyExists) ||
      this.completedPipelines[projectId]?.some(alreadyExists)
    ) {
      return;
    }

    const requestUrl = `http://localhost:3002/v2/${projectId}/pipelines/${pipelineId}`;
    const data = await handleFetch<Pipeline>(requestUrl);

    if (data.status !== 'running') {
      this.completedPipelines[projectId].unshift(data);
    } else {
      this.activePipelines[projectId].unshift(data);
    }

    const payload: PipelinePayload = {
      active: this.activePipelines,
      completed: this.completedPipelines,
    } as const;

    this.mainWindow.webContents.send('pipeline:subscriptions', payload);
  }

  async unsubscribe(request: UnsubscribeRequest) {
    const { projectId, pipelineId, completed } = request;
    const pipelineType = completed ? 'completedPipelines' : 'activePipelines';
    const pipelines = this[pipelineType][projectId];
    const removeTargetId = findTargetId(pipelineId, pipelines);

    // TODO: handle -1 case of the "removeTargetId"
    this[pipelineType][projectId].splice(removeTargetId, 1);

    const payload: PipelinePayload = {
      active: this.activePipelines,
      completed: this.completedPipelines,
    } as const;

    this.mainWindow.webContents.send('pipeline:subscriptions', payload);
  }
}
