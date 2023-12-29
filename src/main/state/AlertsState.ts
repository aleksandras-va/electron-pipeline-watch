import { onNotificationStateUpdate } from './utils/stateUpdateDecorator';
import { Notifications, NotifyOn } from '../../globalTypes';
import { deepCloneObject } from '../utils';

export class AlertsState {
  instance: Notifications;

  constructor() {
    this.instance = {
      notifyOn: {},
    };
  }

  get notifyOn() {
    return this.instance.notifyOn;
  }

  get totalOfUpdatedPipelines() {
    let amount = 0;

    for (let projectId in this.notifyOn) {
      amount += this.notifyOn[projectId].length;
    }

    return amount;
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

const alertsState = new AlertsState();

export { alertsState };
