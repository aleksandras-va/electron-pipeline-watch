import * as Express from 'express';
import { staticPipelineData } from '../data';

export function getPipeline(request: Express.Request, response: Express.Response) {
  const projectId = Number(request.params.projectId);
  const pipelineId = Number(request.params.pipelineId);

  const pipelines = staticPipelineData[projectId];

  response.json(pipelines.find(({ id }) => id === pipelineId));
}
