import { app } from 'electron';
import { RequestReducer } from '../RequestReducer';

export class AppRoutines {
  private initialised: boolean;
  private intervalId: NodeJS.Timeout | null;
  private readonly frequency: number;

  constructor() {
    this.initialised = false;
    this.intervalId = null;

    this.frequency = 10_000; // 10 seconds
  }

  init() {
    this.initialised = true;

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    app.on('browser-window-focus', () => {
      RequestReducer.app({ windowFocus: true });
    });

    app.on('browser-window-blur', () => {
      RequestReducer.app({ windowFocus: false });
    });

    void this.initialised;

    this.startTimer();
  }

  startTimer() {
    this.intervalId = setInterval(() => this.onTick(), this.frequency);
  }

  onTick() {
    RequestReducer.pipeline({ action: 'update-all' });
    RequestReducer.ui({ action: 'timer-update', frequency: this.frequency, timestamp: Date.now() });
  }
}
