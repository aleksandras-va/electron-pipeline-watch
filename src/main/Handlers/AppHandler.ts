import { Static } from '../utils';
import { appState } from '../state/AppState';
import { AppPayload } from '../../globalTypes';
import { AlertsHandler } from './AlertsHandler';

export class AppHandler extends Static {
  static updateAppWindowState(payload: AppPayload) {
    appState.setWindowFocused(payload.windowFocus);

    AlertsHandler.dismissNotifyOn();
  }
}
