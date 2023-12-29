import { Static } from '../utils';
import { uiState } from '../state/UiState';
import { AlertsHandler } from './AlertsHandler';

interface UpdateDropdown {
  projectId: string;
  elementState: 'expanded' | 'collapsed';
}

export class UiHandler extends Static {
  static updateDropdownState({ projectId, elementState }: UpdateDropdown) {
    uiState.updateDropdown(projectId, elementState);

    AlertsHandler.dismissNotifyOn(projectId);
  }
}
