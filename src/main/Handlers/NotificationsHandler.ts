import { deepCloneObject, Static } from '../utils';
import { uiState } from '../state/UiState';
import { projectsState } from '../state/ProjectsState';
import { appState } from '../state/AppState';
import { notificationsState } from '../state/NotificationsState';
import { NotifyOn } from '../../globalTypes';

export class NotificationsHandler extends Static {
  static addNotifyOn() {
    const updateMap: NotifyOn = {};
    const windowInFocus = appState.instance.windowFocused;

    projectsState.ids.forEach((id) => {
      const project = projectsState.instance[id];

      if (!project.lastUpdated.length) return;

      const currentDropdownExpanded = uiState.dropdown[id] === 'expanded';

      if (!windowInFocus || !currentDropdownExpanded) {
        const currentNotifyOn = notificationsState.instance.notifyOn[id] || [];

        updateMap[id] = [...currentNotifyOn, ...project.lastUpdated];
      }
    });

    notificationsState.updateNotifyOn(updateMap);
  }

  static dismissNotifyOn(projectId?: string) {
    const updateMap = deepCloneObject(notificationsState.instance.notifyOn);

    if (!appState.instance.windowFocused) return;

    if (projectId && uiState.instance.dropdown[projectId] === 'expanded') {
      updateMap[projectId] = [];
    } else {
      projectsState.ids.forEach((id) => {
        if (uiState.instance.dropdown[id] === 'expanded') {
          updateMap[id] = [];
        }
      });
    }

    notificationsState.updateNotifyOn(updateMap);
  }
}
