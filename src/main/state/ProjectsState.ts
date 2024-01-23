import { Pipeline, Project, Projects } from '../../globalTypes';
import { updateProject } from './utils/updateProject';
import { onProjectStateUpdate } from './utils/stateUpdateDecorator';

export class ProjectsState {
  // TODO: notifyOn and lastUpdated should be "Set"
  instance: Projects;

  constructor() {
    this.instance = {
      '11': {
        pipelinesData: [
          {
            id: '1',
            project_id: '11',
            ref: 'chore/document-22.2-change',
            status: 'running',
            data: 'Target: 2 | Count: 0',
            done: false,
          },
        ],
        lastUpdated: [],
      },
      '22': {
        pipelinesData: [
          {
            id: '1',
            project_id: '22',
            ref: 'chore/document-22.2-change',
            status: 'running',
            data: 'Target: 2 | Count: 0',
            done: false,
          },
        ],
        lastUpdated: [],
      },
      '33': {
        pipelinesData: [
          {
            id: '1',
            project_id: '33',
            ref: 'chore/document-22.2-change',
            status: 'running',
            data: 'Target: 2 | Count: 0',
            done: false,
          },
        ],
        lastUpdated: [],
      },
      '44': {
        pipelinesData: [
          {
            id: '1',
            project_id: '44',
            ref: 'chore/document-22.2-change',
            status: 'running',
            data: 'Target: 2 | Count: 0',
            done: false,
          },
        ],
        lastUpdated: [],
      },
      '55': {
        pipelinesData: [
          {
            id: '1',
            project_id: '55',
            ref: 'chore/document-22.2-change',
            status: 'running',
            data: 'Target: 2 | Count: 0',
            done: false,
          },
        ],
        lastUpdated: [],
      },
      '66': {
        pipelinesData: [
          {
            id: '1',
            project_id: '66',
            ref: 'chore/document-22.2-change',
            status: 'running',
            data: 'Target: 2 | Count: 0',
            done: false,
          },
        ],
        lastUpdated: [],
      },
      '77': {
        pipelinesData: [
          {
            id: '1',
            project_id: '77',
            ref: 'chore/document-22.2-change',
            status: 'running',
            data: 'Target: 2 | Count: 0',
            done: false,
          },
        ],
        lastUpdated: [],
      },
      '88': {
        pipelinesData: [
          {
            id: '1',
            project_id: '88',
            ref: 'chore/document-22.2-change',
            status: 'running',
            data: 'Target: 2 | Count: 0',
            done: false,
          },
        ],
        lastUpdated: [],
      },
      '99': {
        pipelinesData: [
          {
            id: '1',
            project_id: '99',
            ref: 'chore/document-22.2-change',
            status: 'running',
            data: 'Target: 2 | Count: 0',
            done: false,
          },
        ],
        lastUpdated: [],
      },
    };
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
    console.log(this.instance['22']);
  }

  @onProjectStateUpdate
  public removeCompletedPipelines(projectId: string) {
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
// projectsState.addProject('11');
// projectsState.addProject('22');
// projectsState.addProject('33');
// projectsState.addProject('44');
// projectsState.addProject('55');
// projectsState.addProject('66');
// projectsState.addProject('77');
// projectsState.addProject('88');

export { projectsState };
