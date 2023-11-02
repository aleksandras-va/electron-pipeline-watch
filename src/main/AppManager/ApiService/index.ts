import { handleFetchPipeline, handleFetchPipelines } from './utils/handleFetch';
import { updatePipelines } from './utils/updatePipelines';
import { buildActivePipelineMap } from './utils/buildActivePipelineMap';
import { SubscribeRequest, WatchRequest } from '../../types';
import { PipelinesMap } from '../../../globalTypes';

export class ApiService {
  private readonly activePipelinesMap: PipelinesMap;
  private readonly completedPipelinesMap: PipelinesMap;
  private readonly updatedPipelinesMap: PipelinesMap;

  constructor(active: PipelinesMap, completed: PipelinesMap, updated: PipelinesMap) {
    this.activePipelinesMap = active;
    this.completedPipelinesMap = completed;
    this.updatedPipelinesMap = updated;
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

    const data = await handleFetchPipelines(request);
    const apiActivePipelines = buildActivePipelineMap(data, referenceToActive);

    const { updatedListOfActive, updatedListOfCompleted } = updatePipelines(
      referenceToActive,
      apiActivePipelines
    );

    this.activePipelinesMap[projectId] = [...updatedListOfActive];
    this.completedPipelinesMap[projectId] = [...updatedListOfCompleted, ...referenceToCompleted];
    this.updatedPipelinesMap[projectId] = [...updatedListOfCompleted];
  }
}
