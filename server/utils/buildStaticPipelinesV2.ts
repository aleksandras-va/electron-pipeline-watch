import { Pipeline } from '../types';
import { getRandomString } from './getRandomString';

export function buildStaticPipelinesV2(id: number, count: number) {
  let data: Pipeline[] = [];

  for (let i = 0; i < 9; i++) {
    const pipelineId = i + 1;
    const version = `${id}.${pipelineId}`;
    const possibleStatuses = ['success', 'success', 'failed'];
    const possibleRefs = [
      `feat/feature-of-${version}`,
      `fix/fixing-${version}`,
      `v1.${version}`,
      `chore/document-${version}-change`,
    ];

    data.push({
      id: String(pipelineId),
      project_id: String(id),
      ref: getRandomString(possibleRefs),
      status: count > pipelineId ? getRandomString(possibleStatuses) : 'running',
      data: `${count === pipelineId ? 'NXT ❗' : ''}Target: ${pipelineId} | Count: ${count}`,
    });
  }

  return data;
}
