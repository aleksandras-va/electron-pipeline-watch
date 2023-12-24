import * as Express from 'express';
import { getPipelines } from './endpoints/getPipelines';
import { getPipeline } from './endpoints/getPipeline';
import { buildStaticPipelinesV2 } from './utils/buildStaticPipelinesV2';

const app = Express();
const port = 3002;

app.get('/:projectId/pipelines', getPipelines);
app.get('/:projectId/pipelines/:pipelineId', getPipeline);

const callRegister = {};

app.get('/v2/:projectId/pipelines', (request: Express.Request, response: Express.Response) => {
  const projectId = Number(request.params.projectId);

  if (callRegister[projectId] == null) {
    callRegister[projectId] = 1;
  } else {
    callRegister[projectId]++;
  }

  const result = buildStaticPipelinesV2(projectId, callRegister[projectId]);

  response.json(result);
});

app.get(
  '/v2/:projectId/pipelines/:pipelineId',
  (request: Express.Request, response: Express.Response) => {
    const projectId = Number(request.params.projectId);
    const pipelineId = Number(request.params.pipelineId);

    const pipelines = buildStaticPipelinesV2(projectId, callRegister[projectId] || 0);

    response.json(pipelines.find(({ id }) => id === String(pipelineId)));
  }
);

app.listen(port, () => console.log(`Listening on port ${port}`));
