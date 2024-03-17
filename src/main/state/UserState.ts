import { onUserStateUpdate } from './utils/stateUpdateDecorator';
import { UserData } from '../../globalTypes';

class UserState {
  instance: UserData;

  constructor() {
    this.instance = {
      loggedIn: false,
      name: '',
      settings: {},
    };
  }

  @onUserStateUpdate
  public setLoggedIn(name: string) {
    this.instance = { ...this.instance, loggedIn: true, name };
  }

  @onUserStateUpdate
  public setLoggedOut() {
    this.instance = { ...this.instance, loggedIn: false, name: '' };
  }
}

const userState = new UserState();

export { userState };
