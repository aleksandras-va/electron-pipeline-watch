import { State } from './types';

export function getInitialState(projects: string[]): State {
  return projects.reduce((accumulator, id) => ({ ...accumulator, [id]: 0 }), {});
}

export function getTotalAmountOfBadges(state: State): number {
  return Object.values(state).reduce((accumulator, value) => accumulator + value, 0);
}
