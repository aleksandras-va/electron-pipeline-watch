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
    switch (payload.details) {
      case 'add':
        void PipelineHandler.add(payload);
        break;
      case 'remove':
        PipelineHandler.remove(payload);
        break;
      default:
        throw new Error(`Default case reached at RequestReducer, pipeline, data: ${payload}`);
    }
  }

  static ui(payload: UiPayload) {
    const { details } = payload;

    switch (details) {
      case 'dropdown':
        UiHandler.updateDropdownState({
          projectId: payload.projectId,
          elementState: payload.elementState,
        });
        break;
      default:
        throw new Error(`Default case reached at RequestReducer, ui, data: ${payload}`);
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
