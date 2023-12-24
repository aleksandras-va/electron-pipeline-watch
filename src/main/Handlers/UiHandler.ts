import { Static } from '../utils';
import { uiState } from '../state/UiState';
import { NotificationsHandler } from './NotificationsHandler';

interface UpdateDropdown {
  projectId: string;
  elementState: 'expanded' | 'collapsed';
}

export class UiHandler extends Static {
  static updateDropdownState({ projectId, elementState }: UpdateDropdown) {
    uiState.updateDropdown(projectId, elementState);

    NotificationsHandler.dismissNotifyOn(projectId);
  }
}
