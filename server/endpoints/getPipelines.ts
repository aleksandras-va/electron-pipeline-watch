import * as Express from 'express';
import { buildStaticPipelines } from '../utils/buildStaticPipelines';

export function getPipelines(request: Express.Request, response: Express.Response) {
  const projectId = Number(request.params.projectId);

  response.json(buildStaticPipelines(projectId));
}
