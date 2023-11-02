import { Pipeline } from '../../../../globalTypes';

import { PipelineMap } from './buildActivePipelineMap';

interface UpdatePipelines {
  updatedListOfActive: Pipeline[];
  updatedListOfCompleted: Pipeline[];
}

export function updatePipelines(
  activePipelines: Pipeline[],
  pipelinesFromApi: PipelineMap
): UpdatePipelines {
  let updatedListOfActive: Pipeline[] = [];
  let updatedListOfCompleted: Pipeline[] = [];

  activePipelines.forEach((pipeline) => {
    const currentId = pipeline.id;
    const matchingPipelineFromApi = pipelinesFromApi[currentId];

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
