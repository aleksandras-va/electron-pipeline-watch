import { AppManager } from '../AppManager';
import { PipelinePayload } from '../../globalTypes';

export class DataBridge {
  private readonly appManager: AppManager;

  constructor(appManager: AppManager) {
    this.appManager = appManager;
  }

  message(channel: string) {
    const payload: PipelinePayload = {
      active: this.appManager.activePipelinesMap,
      completed: this.appManager.completedPipelinesMap,
    } as const;

    this.appManager.mainWindow.webContents.send(channel, payload);
  }
}
