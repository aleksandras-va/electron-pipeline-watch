export class Static {
  constructor() {
    throw new Error('Calling constructor on the static class is not allowed.');
  }
}

export function deepCloneObject<T>(object: Record<string, T[]>): Record<string, T[]> {
  return Object.keys(object).reduce((accumulator, key) => {
    accumulator[key] = [...(accumulator[key] || []), ...object[key]];

    return accumulator;
  }, {});
}
