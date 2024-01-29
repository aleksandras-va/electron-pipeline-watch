import * as Express from 'express';
import { buildStaticPipelinesV2 } from './utils/buildStaticPipelinesV2';
import { animals, colors, uniqueNamesGenerator } from 'unique-names-generator';

const app = Express();
const port = 3002;

const projectRegister = {};
const callRegister = {};

const GET_SINGLE_PROJECT = '/v2/projects/:projectId';
const GET_ALL_PIPELINES = '/v2/projects/:projectId/pipelines';
const GET_SINGLE_PIPELINE = '/v2/projects/:projectId/pipelines/:pipelineId';

app.get(GET_SINGLE_PROJECT, (request: Express.Request, response: Express.Response) => {
  const projectId = Number(request.params.projectId);

  if (projectRegister[projectId]) {
    response.json(projectRegister[projectId]);
    return;
  }

  const customConfig = {
    dictionaries: [colors, animals],
    separator: '-',
    length: 2,
  };

  const name = uniqueNamesGenerator(customConfig);

  projectRegister[projectId] = { id: projectId, name };

  response.json({ id: projectId, name });
});

app.get(GET_ALL_PIPELINES, (request: Express.Request, response: Express.Response) => {
  const projectId = Number(request.params.projectId);

  if (callRegister[projectId] == null) {
    callRegister[projectId] = 1;
  } else {
    callRegister[projectId]++;
  }

  const result = buildStaticPipelinesV2(projectId, callRegister[projectId]);

  response.json(result);
});

app.get(GET_SINGLE_PIPELINE, (request: Express.Request, response: Express.Response) => {
  const projectId = Number(request.params.projectId);
  const pipelineId = Number(request.params.pipelineId);

  const pipelines = buildStaticPipelinesV2(projectId, callRegister[projectId] || 0);

  response.json(pipelines.find(({ id }) => id === String(pipelineId)));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
