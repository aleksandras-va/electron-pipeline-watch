import * as Express from 'express';
import { getIsCountdownActive, startCountdown } from './countdown';
import { getPipeline, getPipelines } from './responseHandlers';

const app = Express();
const port = 3002;

app.get('/start/:time', (req: Express.Request, res: Express.Response) => {
  const timeNumber = Number(req.params.time);

  if (isNaN(timeNumber)) {
    res.json({ message: 'Time is incorrect.' });
  } else {
    startCountdown(timeNumber);

    res.sendStatus(200);
  }
});

app.get('/:projectId/pipelines', (request: Express.Request, response: Express.Response) => {
  response.json(getPipelines(request.params.projectId));
});

app.get(
  '/:projectId/pipelines/:pipelineId/:status?',
  (request: Express.Request, response: Express.Response) => {
    const { projectId, pipelineId, status } = request.params;

    const countdownActive = getIsCountdownActive();

    response.send(getPipeline(projectId, pipelineId, countdownActive, status));
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
