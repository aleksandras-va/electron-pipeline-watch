import {
  AppPayload,
  DebugPayload,
  PipelinePayload,
  ProjectPayload,
  UiPayload,
  UserPayload,
} from '../globalTypes';
import { ProjectHandler } from './Handlers/ProjectHandler';
import { UiHandler } from './Handlers/UiHandler';
import { AppHandler } from './Handlers/AppHandler';
import { Static } from './utils';
import { UserHandler } from './Handlers/UserHandler';

export class RequestReducer extends Static {
  static user(payload: UserPayload) {
    const { action } = payload;

    switch (action) {
      case 'login':
        void UserHandler.login(payload);
        break;
      case 'logout':
        void UserHandler.logout();
        break;
      case 'session-check':
        void UserHandler.checkIfLoggedIn();
        break;
      default:
        throw new Error(
          `Default case reached at RequestReducer, USER, data: ${JSON.stringify(payload)}`
        );
    }
  }

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
          `Default case reached at RequestReducer, PROJECT, data: ${JSON.stringify(payload)}`
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
          `Default case reached at RequestReducer, PIPELINE, data: ${JSON.stringify(payload)}`
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
          `Default case reached at RequestReducer, UI, data: ${JSON.stringify(payload)}`
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
