import { Pipeline, Project, Projects } from '../../globalTypes';
import { updateProject } from './utils/updateProject';
import { onProjectStateUpdate } from './utils/stateUpdateDecorator';

export class ProjectsState {
  // TODO: notifyOn and lastUpdated should be "Set"
  instance: Projects;

  constructor() {
    this.instance = {};
  }

  get ids() {
    return Object.keys(this.instance);
  }

  @onProjectStateUpdate
  public addProject(projectId: string) {
    this.instance = { ...this.instance, [projectId]: { pipelinesData: [], lastUpdated: [] } };
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
  }

  @onProjectStateUpdate
  public updateProjects(projects: Project[]) {
    // TODO: currently order of projects is resolved by the way they are ordered in the object, fix it
    this.ids.forEach((id, index) => {
      this.instance = updateProject(this.instance, id, projects[index]);
    });
  }
}

const projectsState = new ProjectsState();

// TODO: Remove this after implementing project add/remove functionality
projectsState.addProject('11');
projectsState.addProject('22');
projectsState.addProject('33');

export { projectsState };
