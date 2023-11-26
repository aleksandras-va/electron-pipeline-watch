import { Pipeline } from '../../../globalTypes';

export function alreadyExists(targetId: string, pipelines: Pipeline[]): boolean {
  return pipelines.some(({ id }) => id === targetId);
}
