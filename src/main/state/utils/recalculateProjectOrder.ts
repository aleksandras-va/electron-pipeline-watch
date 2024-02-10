import { Projects } from '../../../globalTypes';

export function recalculateProjectOrder(projects: Projects): Projects {
  const sortedArray = Object.values(projects).sort((a, b) => a.order - b.order);

  return sortedArray.reduce((accumulator: Projects, project, index) => {
    const projectClone = { ...project, order: index + 1 };

    accumulator[projectClone.id] = projectClone;

    return accumulator;
  }, {});
}
