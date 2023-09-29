import * as Express from 'express';
import { getIsCountdownActive, startCountdown } from './countdown';
import { getPipeline, getPipelines } from './getResponse';
import { statuses } from './constants';

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

app.get('/pipelines', (_: Express.Request, res: Express.Response) => {
  res.json(getPipelines());
});

app.get('/pipelines/:id/:status?', (req: Express.Request, res: Express.Response) => {
  const isTag = req.params.id === '222';
  const status = req.params.status;
  const statusOverride: string | false = statuses.includes(status) && status;
  const countdownActive = getIsCountdownActive();

  res.send(getPipeline(isTag, countdownActive, statusOverride));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
