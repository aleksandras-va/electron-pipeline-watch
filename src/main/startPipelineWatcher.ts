import { BrowserWindow } from 'electron';

export function startPipelineWatcher(mainWindow: BrowserWindow) {
  mainWindow.webContents.send('pipeline:update');
}
