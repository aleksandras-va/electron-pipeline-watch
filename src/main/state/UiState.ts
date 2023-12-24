interface Ui {
  dropdown: Record<string, 'expanded' | 'collapsed'>;
}

export class UiState {
  instance: Ui;

  constructor() {
    this.instance = {
      dropdown: {},
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
}

const uiState = new UiState();

export { uiState };
