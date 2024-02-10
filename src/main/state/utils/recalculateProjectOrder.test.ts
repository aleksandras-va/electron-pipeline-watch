import { expect, it } from 'vitest';
import { recalculateProjectOrder } from './recalculateProjectOrder';
import { Projects } from '../../../globalTypes';

const result = {
  'id-1': { id: 'id-1', order: 1 },
  'id-2': { id: 'id-2', order: 2 },
  'id-3': { id: 'id-3', order: 3 },
  'id-4': { id: 'id-4', order: 4 },
} as unknown as Projects;

it('sorts projects correctly', () => {
  let input = {
    'id-2': { id: 'id-2', order: 4 },
    'id-1': { id: 'id-1', order: 3 },
    'id-4': { id: 'id-4', order: 1000 },
    'id-3': { id: 'id-3', order: 99 },
  } as unknown as Projects;

  expect(recalculateProjectOrder(input)).toStrictEqual(result);

  input = {
    'id-4': { id: 'id-4', order: 1000 },
    'id-3': { id: 'id-3', order: 99 },
    'id-1': { id: 'id-1', order: 3 },
    'id-2': { id: 'id-2', order: 4 },
  } as unknown as Projects;

  expect(recalculateProjectOrder(input)).toStrictEqual(result);
});
