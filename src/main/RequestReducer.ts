import {
  AppPayload,
  DebugPayload,
  PipelinePayload,
  ProjectPayload,
  UiPayload,
} from '../globalTypes';
import { ProjectHandler } from './Handlers/ProjectHandler';
import { UiHandler } from './Handlers/UiHandler';
import { AppHandler } from './Handlers/AppHandler';
import { Static } from './utils';

export class RequestReducer extends Static {
  static project(payload: ProjectPayload) {
    const { action, projectId } = payload;

    switch (action) {
      case 'add':
        void ProjectHandler.addProject({ projectId, projectCustomName: payload.projectCustomName });

        break;

      case 'remove':
        ProjectHandler.removeProject({ projectId });

        break;

      default:
        throw new Error(
          `Default case reached at RequestReducer, project, data: ${JSON.stringify(payload)}`
        );
    }
  }

  static pipeline(payload: PipelinePayload) {
    const { action } = payload;

    switch (action) {
      case 'add':
        void ProjectHandler.addPipeline(payload);
        break;
      case 'remove':
        ProjectHandler.removePipeline(payload);
        break;
      case 'remove-completed':
        ProjectHandler.removeCompleted(payload.projectId);
        break;
      case 'update-all':
        void ProjectHandler.update();
        break;
      default:
        throw new Error(
          `Default case reached at RequestReducer, pipeline, data: ${JSON.stringify(payload)}`
        );
    }
  }

  static ui(payload: UiPayload) {
    const { action } = payload;

    switch (action) {
      case 'dropdown':
        UiHandler.updateDropdownState({
          projectId: payload.projectId,
          elementState: payload.elementState,
        });

        break;

      case 'timer-update':
        UiHandler.timerUpdate(payload);

        break;

      default:
        throw new Error(
          `Default case reached at RequestReducer, ui, data: ${JSON.stringify(payload)}`
        );
    }
  }

  static app(payload: AppPayload) {
    AppHandler.updateAppWindowState(payload);
  }

  static debug(payload: DebugPayload) {
    if (payload.details === 'update-all') {
      void ProjectHandler.update();
    }
  }
}
