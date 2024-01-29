import { Pipeline, PipelineApi, Project, Status } from '../../../globalTypes';
import { isDone } from './isDone';
import { fetchPipelines } from './handleFetch';
import { projectsState } from '../../state/ProjectsState';

export async function prepareProjectUpdate(id: string): Promise<Project> {
  const { pipelinesData, lastUpdated, ...rest } = projectsState.instance[id];

  lastUpdated.splice(0, lastUpdated.length);

  if (!pipelinesData.length) return { pipelinesData: [], lastUpdated, ...rest };

  // Clone pipelines
  const pipelines: Pipeline[] = pipelinesData.map((it) => ({ ...it }));

  const pipelinesFromApi: PipelineApi[] = await fetchPipelines({ projectId: id });

  pipelines.forEach((pipeline) => {
    if (pipeline.done) return;

    for (let i = 0; i < pipelinesFromApi.length; i++) {
      const pipelineFromApi = pipelinesFromApi[i];

      if (pipeline.id === pipelineFromApi.id) {
        const status: Status = pipelineFromApi.status;

        pipeline.data = pipelineFromApi.data;
        pipeline.status = status;

        if (isDone(status)) {
          pipeline.done = true;
          lastUpdated.push(pipeline.id);
        }
      }
    }
  });

  return { pipelinesData: pipelines, lastUpdated, ...rest };
}
