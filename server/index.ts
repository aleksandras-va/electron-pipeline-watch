import * as Express from 'express';
import { getPipelines } from './endpoints/getPipelines';
import { getPipeline } from './endpoints/getPipeline';

const app = Express();
const port = 3002;

app.get('/:projectId/pipelines', getPipelines);
app.get('/:projectId/pipelines/:pipelineId', getPipeline);

app.listen(port, () => console.log(`Listening on port ${port}`));
