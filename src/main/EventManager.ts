export enum StateUpdateType {
  Project = 'project-state-update',
  Ui = 'ui-state-update',
  App = 'app-state-update',
  Alert = 'alert-state-update',
}

export interface IObserver {
  onObserverNotify: (type: StateUpdateType) => void;
}

class EventManager {
  private observers: IObserver[];

  constructor() {
    this.observers = [];
  }

  subscribe(observer: IObserver) {
    this.observers.push(observer);
  }

  notify(type: StateUpdateType) {
    this.observers.forEach((observer) => observer.onObserverNotify(type));
  }
}

const eventManager = new EventManager();

export { eventManager };
