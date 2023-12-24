import { Static } from '../utils';
import { appState } from '../state/AppState';
import { AppPayload } from '../../globalTypes';
import { NotificationsHandler } from './NotificationsHandler';

export class AppHandler extends Static {
  static updateAppWindowState(payload: AppPayload) {
    appState.setWindowFocused(payload.windowFocus);

    NotificationsHandler.dismissNotifyOn();
  }
}
