import { Project, Projects } from '../../../globalTypes';

export function updateProject(state: Projects, id: string, updatedProject: Project): Projects {
  return {
    ...state,
    [id]: {
      ...state[id],
      pipelinesData: [...updatedProject.pipelinesData.map((it) => ({ ...it }))],
      lastUpdated: [...updatedProject.lastUpdated],
    },
  };
}
