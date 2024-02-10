import { Pipeline, Project, Projects } from '../../globalTypes';
import { updateProject } from './utils/updateProject';
import { onProjectStateUpdate } from './utils/stateUpdateDecorator';
import { recalculateProjectOrder } from './utils/recalculateProjectOrder';

export class ProjectsState {
  // TODO: notifyOn and lastUpdated should be "Set"
  instance: Projects;

  constructor() {
    this.instance = {};
  }

  get ids() {
    return Object.keys(this.instance);
  }

  get projectsWithUpdates(): string[] {
    return Object.entries(this.instance).reduce((accumulator: string[], [key, value]) => {
      if (value.lastUpdated.length) {
        accumulator.push(key);
      }

      return accumulator;
    }, []);
  }

  @onProjectStateUpdate
  public addProject(projectId: string, projectName: string, projectCustomName?: string) {
    this.instance = {
      ...this.instance,
      [projectId]: {
        pipelinesData: [],
        lastUpdated: [],
        name: projectName,
        customName: projectCustomName,
        id: projectId,
        order: this.ids.length + 1,
      },
    };
  }

  @onProjectStateUpdate
  public removeProject(projectId: string) {
    const clone = { ...this.instance };

    delete clone[projectId];

    this.instance = { ...recalculateProjectOrder(clone) };
  }

  @onProjectStateUpdate
  public addPipeline(projectId: string, pipeline: Pipeline) {
    const state = this.instance;

    this.instance = {
      ...state,
      [projectId]: {
        ...state[projectId],
        pipelinesData: [{ ...pipeline }, ...state[projectId].pipelinesData],
      },
    };

    this.clearLastUpdates();
  }

  @onProjectStateUpdate
  public removePipeline(projectId: string, pipelineId: string) {
    const state = this.instance;

    this.instance = {
      ...state,
      [projectId]: {
        ...state[projectId],
        pipelinesData: [
          ...state[projectId].pipelinesData.filter(({ id }) => String(id) !== pipelineId),
        ],
      },
    };

    this.clearLastUpdates();
  }

  @onProjectStateUpdate
  public bulkRemoveCompletedPipelines(projectId: string) {
    const state = this.instance;

    this.instance = {
      ...state,
      [projectId]: {
        ...state[projectId],
        pipelinesData: [...state[projectId].pipelinesData.filter(({ done }) => !done)],
      },
    };

    this.clearLastUpdates();
  }

  @onProjectStateUpdate
  public updateProjects(projects: Project[]) {
    // TODO: currently order of projects is resolved by the way they are ordered in the object, fix it
    this.ids.forEach((id, index) => {
      this.instance = updateProject(this.instance, id, projects[index]);
    });
  }

  // Make sure "lastUpdated" is empty when using "add" or "remove" commands.
  private clearLastUpdates() {
    const state = this.instance;

    this.instance = Object.keys(state).reduce((accumulator, id): Projects => {
      return { ...accumulator, [id]: { ...state[id], lastUpdated: [] } };
    }, {});
  }
}

const projectsState = new ProjectsState();

// TODO: Remove this after implementing project add/remove functionality
// projectsState.addProject('11', 'my-project');
// projectsState.addProject('22', 'my-ProjectView-2');

export { projectsState };
