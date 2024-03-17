import { Static } from '../utils';
import { configurationStore } from '../ConfigurationStore';
import { userState } from '../state/UserState';

interface Login {
  username: string;
  apiKey: string;
  frequency: string;
}

export class UserHandler extends Static {
  static login({ username, apiKey, frequency }: Login) {
    configurationStore.username = username;
    configurationStore.userApiKey = apiKey;
    configurationStore.updateFrequency = frequency;

    this.checkIfLoggedIn();
  }

  static logout() {
    userState.setLoggedOut();

    configurationStore.clear();
  }

  static checkIfLoggedIn() {
    const { username, userApiKey } = configurationStore;

    if (username && userApiKey) {
      userState.setLoggedIn(username);
    } else {
      userState.setLoggedOut();
    }
  }
}
