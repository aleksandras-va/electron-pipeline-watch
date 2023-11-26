import { app } from 'electron';
import { RequestReducer } from '../RequestReducer';

export class DynamicProcess {
  private initialised: boolean;

  constructor() {
    this.initialised = false;
  }

  init() {
    // Start timer, if initialised is true, first, kill the first timer
    this.initialised = true;

    app.on('browser-window-focus', () => {
      RequestReducer.app({ windowFocus: true });
    });

    app.on('browser-window-blur', () => {
      RequestReducer.app({ windowFocus: false });
    });

    void this.initialised;
  }
}
