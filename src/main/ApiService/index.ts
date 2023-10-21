import { Pipeline, PipelinesMap } from '../../globalTypes';

import { SubscribeRequest, WatchRequest } from '../types';
import { handleFetchPipeline, handleFetchPipelines } from './utils/handleFetch';
import { updatePipelines } from './utils/updatePipelines';

export class ApiService {
  private readonly activePipelinesMap: PipelinesMap;
  private readonly completedPipelinesMap: PipelinesMap;

  constructor(active: PipelinesMap, completed: PipelinesMap) {
    this.activePipelinesMap = active;
    this.completedPipelinesMap = completed;
  }

  async register(request: SubscribeRequest) {
    const data = await handleFetchPipeline(request);

    if (data.status !== 'running') {
      this.completedPipelinesMap[request.projectId].unshift(data);
    } else {
      this.activePipelinesMap[request.projectId].unshift(data);
    }
  }

  async update(request: WatchRequest) {
    const { projectId } = request;
    const referenceToActive = this.activePipelinesMap[projectId];
    const referenceToCompleted = this.completedPipelinesMap[projectId];

    const activePipelinesIds = referenceToActive.map(({ id }) => id);
    const pipelinesFromApi: Map<number, Pipeline> = new Map();

    const data = await handleFetchPipelines(request);

    // Build Map of newly fetched pipelines
    data.forEach((pipeline) => {
      if (activePipelinesIds.includes(pipeline.id)) {
        pipelinesFromApi.set(pipeline.id, pipeline);
      }
    });

    const { updatedListOfActive, updatedListOfCompleted } = updatePipelines(
      referenceToActive,
      pipelinesFromApi
    );

    this.activePipelinesMap[projectId] = [...updatedListOfActive];
    this.completedPipelinesMap[projectId] = [...updatedListOfCompleted, ...referenceToCompleted];
  }
}
