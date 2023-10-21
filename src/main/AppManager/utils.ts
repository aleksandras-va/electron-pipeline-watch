import { Pipeline } from '../../globalTypes';

export function pipelineAlreadyRegistered(targetId: number, pipelines: Pipeline[]): boolean {
  return pipelines.some(({ id }) => id === targetId);
}

export function findTargetId(target: number, array: { id: number }[]) {
  let targetId = -1;

  for (let i = 0; i < array.length; i++) {
    if (target === array[i].id) {
      targetId = i;

      break;
    }
  }

  return targetId;
}
