import { Static } from '../utils';
import { prepareProjectUpdate } from './utils/prepareProjectUpdate';
import { isDone } from './utils/isDone';
import { fetchPipeline, fetchProject } from './utils/handleFetch';
import { projectsState } from '../state/ProjectsState';
import { AlertsHandler } from './AlertsHandler';
import { alreadyExists } from './utils/alreadyExists';
import { Pipeline, PipelineApi, ProjectApi } from '../../globalTypes';

interface AddProjectRequest {
  projectId: string;
  projectCustomName?: string;
}

interface RemoveProjectRequest {
  projectId: string;
}

interface AddRemovePipelineRequest {
  projectId: string;
  pipelineId: string;
}

export class ProjectHandler extends Static {
  static async addProject(request: AddProjectRequest) {
    const { projectId, projectCustomName } = request;

    const projectApi: ProjectApi = await fetchProject(projectId);

    projectsState.addProject(projectId, projectApi.name, projectCustomName);
  }

  static removeProject(request: RemoveProjectRequest) {
    const { projectId } = request;

    projectsState.removeProject(projectId);
  }

  static async addPipeline(request: AddRemovePipelineRequest) {
    const { projectId, pipelineId } = request;

    if (alreadyExists(pipelineId, projectsState.instance[projectId].pipelinesData)) return;

    // It's okay to set it as a modified pipeline as interfaces are pretty much the same
    const pipeline = (await fetchPipeline(request)) as PipelineApi as Pipeline;

    pipeline.done = isDone(pipeline.status);

    projectsState.addPipeline(projectId, pipeline);
  }

  static removePipeline(request: AddRemovePipelineRequest) {
    const { projectId, pipelineId } = request;

    projectsState.removePipeline(String(projectId), String(pipelineId));
  }

  static removeCompleted(projectId: string) {
    projectsState.bulkRemoveCompletedPipelines(projectId);
  }

  static async update() {
    const projectUpdates = projectsState.ids.map((id) => prepareProjectUpdate(id));
    const updatedProjects = await Promise.all(projectUpdates);

    projectsState.updateProjects(updatedProjects);

    // Check if there are any status changes with this update
    if (updatedProjects.some(({ lastUpdated }) => lastUpdated.length)) {
      AlertsHandler.addNotifyOn();
    }
  }
}
