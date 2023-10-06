import * as Express from 'express';
import { staticPipelineData } from '../data';
import { buildStaticPipelines } from '../utils/buildStaticPipelines';

export function getPipelines(request: Express.Request, response: Express.Response) {
  const projectId = Number(request.params.projectId);

  staticPipelineData['11'] = buildStaticPipelines(11);
  staticPipelineData['22'] = buildStaticPipelines(22);
  staticPipelineData['33'] = buildStaticPipelines(33);

  response.json(staticPipelineData[projectId]);
}
