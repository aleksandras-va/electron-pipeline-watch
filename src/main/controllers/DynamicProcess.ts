import { app } from 'electron';
import { RequestReducer } from '../RequestReducer';

export class DynamicProcess {
  private initialised: boolean;
  private intervalId: NodeJS.Timeout | null;
  private readonly frequency: number;
  private prev: number;

  constructor() {
    this.initialised = false;
    this.intervalId = null;

    this.frequency = 5_000; // 10 seconds

    this.prev = 0;
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
    const current = Date.now();
    const diff = (current - this.prev) / 1000;
    this.prev = current;

    RequestReducer.pipeline({ action: 'update-all' });
    console.log('Fetch requested', diff);
    // RequestReducer.ui({ action: 'timer-update', frequency: this.frequency, timestamp: Date.now() });
  }
}
