import { Static } from '../utils';
import { prepareProjectUpdate } from './utils/prepareProjectUpdate';
import { isDone } from './utils/isDone';
import { fetchPipeline } from './utils/handleFetch';
import { projectsState } from '../state/ProjectsState';
import { AlertsHandler } from './AlertsHandler';
import { alreadyExists } from './utils/alreadyExists';

interface AddRemoveRequest {
  projectId: string;
  pipelineId: string;
}

export class PipelineHandler extends Static {
  static async add(request: AddRemoveRequest) {
    const { projectId, pipelineId } = request;

    if (alreadyExists(pipelineId, projectsState.instance[projectId].pipelinesData)) return;

    const pipeline = await fetchPipeline(request);

    pipeline.done = isDone(pipeline.status);

    projectsState.addPipeline(projectId, pipeline);
  }

  static remove(request: AddRemoveRequest) {
    const { projectId, pipelineId } = request;

    projectsState.removePipeline(String(projectId), String(pipelineId));
  }

  static removeCompleted(projectId: string) {
    projectsState.removeCompletedPipelines(projectId);
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
