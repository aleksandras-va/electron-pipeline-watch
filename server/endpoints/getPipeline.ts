import * as Express from 'express';
import { buildStaticPipelines } from '../utils/buildStaticPipelines';

export function getPipeline(request: Express.Request, response: Express.Response) {
  const projectId = Number(request.params.projectId);
  const pipelineId = Number(request.params.pipelineId);

  const pipelines = buildStaticPipelines(projectId, 0);

  response.json(pipelines.find(({ id }) => id === String(pipelineId)));
}
