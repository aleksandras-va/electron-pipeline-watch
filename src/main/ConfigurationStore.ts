import Store from 'electron-store';

interface Configuration {
  username: string;
  userApiKey: string;
  updateFrequency: string;
}

class ConfigurationStore {
  private store: Store<Configuration>;

  constructor() {
    try {
      this.store = new Store();
    } catch (error) {
      throw new Error(`Configuration error! More:\n${error}`);
    }
  }

  // Username
  get username() {
    return this.store.get('username');
  }

  set username(value) {
    this.store.set('username', value);
  }

  // API key
  get userApiKey() {
    return this.store.get('userApiKey');
  }

  set userApiKey(value) {
    this.store.set('userApiKey', value);
  }

  // Update Frequency
  get updateFrequency() {
    return this.store.get('updateFrequency');
  }

  set updateFrequency(value) {
    this.store.set('updateFrequency', value);
  }
}

const configurationStore = new ConfigurationStore();

export { configurationStore };
