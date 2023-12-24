interface App {
  windowFocused: boolean;
}

export class AppState {
  instance: App;

  constructor() {
    this.instance = {
      windowFocused: true,
    };
  }

  public setWindowFocused(focused: boolean) {
    this.instance = { ...this.instance, windowFocused: focused };
  }
}

const appState = new AppState();

export { appState };
