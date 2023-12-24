import { Status } from '../../../globalTypes';

export function isDone(status: Status): boolean {
  return !['created', 'pending', 'running'].includes(status);
}
