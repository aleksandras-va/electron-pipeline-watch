import { Pipeline } from '../types';
import { getRandomString } from './getRandomString';

export function buildStaticPipelines(id: number) {
  let data: Pipeline[] = [];

  for (let i = 0; i < 9; i++) {
    const pipelineId = Number(`${id}0${111 * (i + 1)}`);
    const possibleStatuses = ['success', 'success', 'success', 'success', 'failed'];
    const possibleRefs = [
      `feat/feature-of-${pipelineId}`,
      `fix/fixing-${pipelineId}`,
      `v1.50.${pipelineId}`,
      `chore/document-${pipelineId}-change`,
    ];

    data.push({
      id: pipelineId,
      project_id: id,
      ref: getRandomString(possibleRefs),
      status: getRandomString(possibleStatuses),
    });
  }

  return data;
}
