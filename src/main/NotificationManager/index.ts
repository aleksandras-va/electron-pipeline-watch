import { IObserver, StateUpdateType } from '../EventManager';

class NotificationManager implements IObserver {
  constructor() {}

  public onObserverNotify(type: StateUpdateType): void {
    if (StateUpdateType.Ui === type) {
      // app.setBadgeCount(getAmountOfBadges(state.instance.allUpdatedIds));
    }

    if (StateUpdateType.App === type) {
    }
  }

  // public setNotificationData(updatedProjects: Project[]) {
  //   const windowInFocus = appState.instance.windowFocused;
  //
  //   projectsState.ids.forEach((id, index) => {
  //     const currentProject = updatedProjects[index];
  //
  //     if (!currentProject.lastUpdated.length) return;
  //
  //     const currentDropdownExpanded = uiState.dropdown[id] === 'expanded';
  //
  //     if (!windowInFocus || !currentDropdownExpanded) {
  //       currentProject.notifyOn = [...currentProject.notifyOn, ...currentProject.lastUpdated];
  //     }
  //   });
  // }
  //
  // public handleDismiss(projectId: string) {
  //   if (uiState.instance.dropdown[projectId] === 'expanded' && state.instance.app.windowFocused) {
  //     projectsState.updateProjectNotifyOn(projectId, []);
  //   }
  // }
}

const notificationManager = new NotificationManager();

export { notificationManager };
