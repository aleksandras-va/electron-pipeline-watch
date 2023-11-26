import { Updated } from '../../../globalTypes';

export function getAmountOfBadges(updatedIds: Updated) {
  let amountOfBadges = 0;

  for (const key in updatedIds) {
    amountOfBadges += updatedIds[key].length;
  }

  return amountOfBadges;
}
