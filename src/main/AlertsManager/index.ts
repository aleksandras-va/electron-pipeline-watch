import { IObserver, StateUpdateType } from '../EventManager';
import { app, BrowserWindow, Notification } from 'electron';
import { alertsState } from '../state/AlertsState';
import { projectsState } from '../state/ProjectsState';
import { getNotificationData } from './utils/getNotificationData';

export class AlertsManager implements IObserver {
  private browserWindow: BrowserWindow;

  constructor(browserWindow: BrowserWindow) {
    this.browserWindow = browserWindow;
  }

  public onObserverNotify(type: StateUpdateType): void {
    if (type === StateUpdateType.Alert) {
      app.setBadgeCount(alertsState.totalOfUpdatedPipelines);
    }

    if (type === StateUpdateType.Project) {
      if (projectsState.projectsWithUpdates.length) {
        const notification = new Notification(getNotificationData());

        notification.show();

        notification.on('click', () => {
          this.browserWindow.restore();
          notification.close();
        });
      }
    }
  }
}
