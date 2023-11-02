import { app } from 'electron';
import { PipelinesMap } from '../../../globalTypes';
import { AppManager } from '../index';
import { getInitialState, getTotalAmountOfBadges } from './utils';

export class BadgeManager {
  private readonly appManager: AppManager;
  private updatedPipelinesMap: PipelinesMap;
  private readonly badgeState: Record<string, number>;
  private readonly projects: string[];

  constructor(appManager: AppManager) {
    this.appManager = appManager;
    this.updatedPipelinesMap = appManager.updatedPipelinesMap;
    this.projects = appManager.projects;

    this.badgeState = getInitialState(this.projects);
  }

  listen() {
    this.appManager.emitter.on('state-update', () => {
      const { state } = this.appManager;

      if (state.windowFocused) {
        let willEmit = false;

        this.projects.forEach((projectId) => {
          if (state.projects[projectId].uiAccordion === 'expanded') {
            this.badgeState[projectId] = 0;
            willEmit = true;
          }
        });

        willEmit && this.appManager.emitter.emit('badge-update', this.badgeState);
      }
    });
  }

  setBadges() {
    Object.entries(this.updatedPipelinesMap).forEach(([projectId, updateProjectsArray]) => {
      const amountOfUpdatedProjects = updateProjectsArray.length;

      if (!amountOfUpdatedProjects) return;

      const currentAmountOfProjectBadges = this.badgeState[projectId];

      this.badgeState[projectId] = currentAmountOfProjectBadges + amountOfUpdatedProjects;
    });

    const totalBadgeAmount = getTotalAmountOfBadges(this.badgeState);

    app.setBadgeCount(totalBadgeAmount);
    this.appManager.emitter.emit('badge-update', this.badgeState);
  }
}
