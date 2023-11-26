import { onNotificationStateUpdate } from './utils/stateUpdateDecorator';
import { Notifications, NotifyOn } from '../../globalTypes';
import { deepCloneObject } from '../utils';

export class NotificationsState {
  instance: Notifications;

  constructor() {
    this.instance = {
      notifyOn: {},
    };
  }

  @onNotificationStateUpdate
  public updateNotifyOn(notificationsMap: NotifyOn) {
    const state = this.instance;
    const notificationsClone = deepCloneObject(notificationsMap);

    this.instance = {
      ...state,
      notifyOn: { ...state.notifyOn, ...notificationsClone },
    };
  }
}

const notificationsState = new NotificationsState();

export { notificationsState };
