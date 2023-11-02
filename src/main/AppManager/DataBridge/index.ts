import { AppManager } from '../index';
import { PipelinePayload } from '../../../globalTypes';

export class DataBridge {
  private readonly appManager: AppManager;

  constructor(appManager: AppManager) {
    this.appManager = appManager;
  }

  listen() {
    this.appManager.emitter.on('badge-update', (payload: Record<string, number>) => {
      this.appManager.mainWindow.webContents.send('badges', payload);
    });
  }

  message(channel: string) {
    const payload: PipelinePayload = {
      active: this.appManager.activePipelinesMap,
      completed: this.appManager.completedPipelinesMap,
    } as const;

    this.appManager.mainWindow.webContents.send(channel, payload);
  }
}
