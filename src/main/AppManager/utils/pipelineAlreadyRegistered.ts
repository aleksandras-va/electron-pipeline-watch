import { Pipeline } from '../../../globalTypes';

export function pipelineAlreadyRegistered(targetId: number, pipelines: Pipeline[]): boolean {
  return pipelines.some(({ id }) => id === targetId);
}
