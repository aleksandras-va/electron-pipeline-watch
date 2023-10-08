import { BrowserWindow } from 'electron';
import { SubscribeRequest } from '../types';
import { BridgeList, Pipeline } from '../../globalTypes';
import { handleFetch } from './utils';

export interface IDataBridge {
  bridgeList: BridgeList;

  getBridge(): BridgeList;
  watch(): Promise<void>;
  subscribe(subscribeRequest: SubscribeRequest): Promise<void>;
  unsubscribe(subscribeRequest: SubscribeRequest): Promise<void>;
}

export class DataBridge implements IDataBridge {
  private readonly mainWindow: BrowserWindow;
  public bridgeList: BridgeList;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
    this.bridgeList = {};
  }

  getBridge() {
    return this.bridgeList;
  }

  async watch() {
    setInterval(async () => {
      const projectsList = Object.keys(this.bridgeList);

      const featPromises = projectsList.map(async (projectId): Promise<Pipeline[]> => {
        return handleFetch<Pipeline[]>(`http://localhost:3002/${projectId}/pipelines/`);
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
      Object.entries(this.bridgeList).forEach(([projectId, pipelines]) => {
        const updatedData = mappedResults.get(Number(projectId));

        pipelines.forEach((pipeline) => {
          pipeline.status = updatedData![pipeline.id].status;
          pipeline.random = updatedData![pipeline.id].random;
        });
      });

      this.mainWindow.webContents.send('pipeline:update', this.bridgeList);
    }, 5000);
  }

  async subscribe(request: SubscribeRequest) {
    const { projectId, pipelineId } = request;
    const alreadyExists = (pipeline: Pipeline) => pipeline.id === pipelineId;

    if (!this.bridgeList.hasOwnProperty(projectId)) {
      this.bridgeList[projectId] = [];
    } else if (this.bridgeList[projectId].some(alreadyExists)) {
      return;
    }

    const requestUrl = `http://localhost:3002/${projectId}/pipelines/${pipelineId}`;
    const data = await handleFetch<Pipeline>(requestUrl);

    this.bridgeList[projectId].unshift(data);
  }

  async unsubscribe(request: SubscribeRequest) {
    const { projectId, pipelineId } = request;

    const pipelines = this.bridgeList[projectId];

    let target: number;

    for (let i = 0; i < pipelines.length; i++) {
      if (pipelineId === pipelines[i].id) {
        target = i;

        break;
      }
    }

    this.bridgeList[projectId].splice(target!, 1);
  }
}
