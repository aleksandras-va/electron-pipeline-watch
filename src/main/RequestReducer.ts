import {
  AppPayload,
  DebugPayload,
  PipelinePayload,
  ProjectPayload,
  UiPayload,
} from '../globalTypes';
import { PipelineHandler } from './Handlers/PipelineHandler';
import { UiHandler } from './Handlers/UiHandler';
import { AppHandler } from './Handlers/AppHandler';
import { Static } from './utils';

export class RequestReducer extends Static {
  static project(payload: ProjectPayload) {
    void payload;
  }

  static pipeline(payload: PipelinePayload) {
    const { action } = payload;

    switch (action) {
      case 'add':
        void PipelineHandler.add(payload);
        break;
      case 'remove':
        PipelineHandler.remove(payload);
        break;
      case 'remove-completed':
        PipelineHandler.removeCompleted(payload.projectId);
        break;
      case 'update-all':
        void PipelineHandler.update();
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
      void PipelineHandler.update();
    }
  }
}
