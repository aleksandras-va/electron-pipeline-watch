import { onUserStateUpdate } from './utils/stateUpdateDecorator';

interface User {
  loggedIn: boolean;
  settings: unknown;
}

class UserState {
  instance: User;

  constructor() {
    this.instance = {
      loggedIn: false,
      settings: {},
    };
  }

  @onUserStateUpdate
  public setLoggedIn() {
    this.instance = { ...this.instance, loggedIn: true };
  }

  @onUserStateUpdate
  public setLoggedOut() {
    this.instance = { ...this.instance, loggedIn: false };
  }
}

const userState = new UserState();

export { userState };
