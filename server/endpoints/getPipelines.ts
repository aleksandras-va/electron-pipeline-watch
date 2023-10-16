import * as Express from 'express';
import { buildStaticPipelines } from '../utils/buildStaticPipelines';

let count = 0;

export function getPipelines(request: Express.Request, response: Express.Response) {
  const projectId = Number(request.params.projectId);

  count++;

  response.json(buildStaticPipelines(projectId, count));
}
