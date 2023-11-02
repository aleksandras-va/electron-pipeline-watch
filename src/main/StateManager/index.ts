import EventEmitter from 'events';

type ProjectState = {
  uiAccordion: 'hidden' | 'collapsed' | 'expanded';
};

type Action = {
  target: string;
  payload: 'hidden' | 'collapsed' | 'expanded';
};

interface State {
  windowFocused: boolean;
  projects: Record<string, ProjectState>;
}

export class StateManager {
  private readonly emitterInstance: EventEmitter;
  private stateInstance: State;

  constructor() {
    this.stateInstance = {
      windowFocused: false,
      projects: {
        '11': { uiAccordion: 'hidden' },
        '22': { uiAccordion: 'hidden' },
        '33': { uiAccordion: 'hidden' },
      },
    };

    this.emitterInstance = new EventEmitter();
  }

  get emitter() {
    return this.emitterInstance;
  }

  get state() {
    return this.stateInstance;
  }

  setWindowFocusState(action: { payload: boolean }) {
    this.stateInstance = { ...this.stateInstance, windowFocused: action.payload };
    this.emitter.emit('state-update');
  }

  setProjectState(action: Action) {
    const currentState = this.stateInstance;

    this.stateInstance = {
      ...currentState,
      projects: {
        ...currentState.projects,
        [action.target]: {
          ...currentState.projects[action.target],
          uiAccordion: action.payload,
        },
      },
    };

    this.emitter.emit('state-update');
  }
}
