import * as Express from 'express';
import { getPipelines } from './endpoints/getPipelines';
import { buildStaticPipelines } from './utils/buildStaticPipelines';
import { staticPipelineData } from './data';
import { getPipeline } from './endpoints/getPipeline';

const app = Express();
const port = 3002;

staticPipelineData['11'] = buildStaticPipelines(11);
staticPipelineData['22'] = buildStaticPipelines(22);
staticPipelineData['33'] = buildStaticPipelines(33);

app.get('/:projectId/pipelines', getPipelines);
app.get('/:projectId/pipelines/:pipelineId', getPipeline);

app.listen(port, () => console.log(`Listening on port ${port}`));
