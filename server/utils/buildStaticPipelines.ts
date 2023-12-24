import { Pipeline } from '../types';
import { getRandomString } from './getRandomString';

export function buildStaticPipelines(id: number, count: number) {
  let data: Pipeline[] = [];

  for (let i = 0; i < 9; i++) {
    const seed = i + 2;
    const pipelineId = 111 * (i + 1);
    const version = `${id}.${pipelineId}`;
    const possibleStatuses = ['success', 'success', 'failed'];
    const possibleRefs = [
      `feat/feature-of-${version}`,
      `fix/fixing-${version}`,
      `v1.${version}`,
      `chore/document-${version}-change`,
    ];

    const randomVerbs = [
      '🏃 Running',
      '🚶 Walking',
      '🏊 Swimming',
      '🚴 Cycling',
      '🧘 Meditating',
      '🧹 Sweeping',
      '🛏️ Sleeping',
      '🚀 Launching',
      '🛒 Shopping',
      '🏋️‍♀️ Lifting',
      '🤸‍️ Flipping',
      '🍳 Cooking',
      '🎤 Singing',
      '🎨 Painting',
      '📚 Reading',
      '🚗 Driving',
      '✈️ Flying',
      '🎸 Playing',
      '🛁 Bathing',
      '📝 Writing',
    ];

    data.push({
      id: String(pipelineId),
      project_id: String(id),
      ref: getRandomString(possibleRefs),
      status: count > seed ? getRandomString(possibleStatuses) : 'running',
      random: getRandomString(randomVerbs),
    });
  }

  return data;
}
