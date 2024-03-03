import { Ui } from '../../globalTypes';
import { onUiStateUpdate } from './utils/stateUpdateDecorator';

class UiState {
  instance: Ui;

  constructor() {
    this.instance = {
      dropdown: {},
      timerData: {
        frequency: 0,
        timestamp: 0,
      },
    };
  }

  get dropdown() {
    return this.instance.dropdown;
  }

  public updateDropdown(projectId: string, elementState: 'expanded' | 'collapsed') {
    const state = this.instance;

    this.instance = {
      ...state,
      dropdown: { ...state.dropdown, [projectId]: elementState },
    };
  }

  @onUiStateUpdate
  public updateTimerData(frequency: number, timestamp: number) {
    const state = this.instance;

    this.instance = {
      ...state,
      timerData: { frequency, timestamp },
    };
  }
}

const uiState = new UiState();

export { uiState };
