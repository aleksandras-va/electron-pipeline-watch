import { PipelinesMap } from '../../../globalTypes';

export function factoryPipelineMap(projects: string[]): PipelinesMap {
  return projects.reduce((accumulator, project) => {
    accumulator[project] = [];

    return accumulator;
  }, {});
}
