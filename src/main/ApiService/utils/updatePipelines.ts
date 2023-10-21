import { Pipeline } from '../../../globalTypes';

interface UpdatePipelines {
  updatedListOfActive: Pipeline[];
  updatedListOfCompleted: Pipeline[];
}

export function updatePipelines(
  activePipelines: Pipeline[],
  pipelinesFromApi: Map<number, Pipeline>
): UpdatePipelines {
  let updatedListOfActive: Pipeline[] = [];
  let updatedListOfCompleted: Pipeline[] = [];

  activePipelines.forEach((pipeline) => {
    const currentId = pipeline.id;
    const matchingPipelineFromApi = pipelinesFromApi.get(currentId);

    if (!matchingPipelineFromApi) {
      throw new Error(`Pipeline ID: ${currentId} does not exist in API response.`);
    }

    if (matchingPipelineFromApi.status !== 'running') {
      pipeline.status = matchingPipelineFromApi.status;
      updatedListOfCompleted.push(pipeline);
    } else {
      updatedListOfActive.push(pipeline);
    }

    pipeline.data = matchingPipelineFromApi.data;
  });

  updatedListOfCompleted.reverse();

  return { updatedListOfActive, updatedListOfCompleted };
}
