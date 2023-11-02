import { Pipeline } from '../../../../globalTypes';

export type PipelineMap = Record<number, Pipeline>;

export function buildActivePipelineMap(
  apiData: Pipeline[],
  activePipelines: Pipeline[]
): PipelineMap {
  const activePipelinesIds = activePipelines.map(({ id }) => id);

  return apiData.reduce((accumulator, apiPipeline) => {
    if (activePipelinesIds.includes(apiPipeline.id)) {
      accumulator[apiPipeline.id] = apiPipeline;
    }

    return accumulator;
  }, {});
}
