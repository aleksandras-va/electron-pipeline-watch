import { app, BrowserWindow, ipcMain } from 'electron';
import { createWindow } from './createWindow';
import { SubscribeRequest, UnsubscribeRequest } from './types';
import { AppManager } from './AppManager';

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let mainWindow: BrowserWindow;

let appManager: AppManager;

app.whenReady().then(async () => {
  mainWindow = createWindow();

  mainWindow.on('minimize', () => {
    // Handle the minimization event here
    console.log('Window minimized');
  });

  mainWindow.on('restore', () => {
    // Handle the restoration event here
    console.log('Window restored');
  });

  app.on('activate', function () {
    // On macOS, it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  appManager = new AppManager(mainWindow);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  console.warn('You tearing me apart!');

  console.error('❌ App terminated and will no longer work properly.');

  app.quit();

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('pipeline:subscribe', async (_, payload: SubscribeRequest) => {
  await appManager.subscribe(payload);
});

ipcMain.on('debug:manual-fetch', async () => {
  await appManager.watch();
});

ipcMain.on('pipeline:unsubscribe', (_, payload: UnsubscribeRequest) => {
  appManager.unsubscribe(payload);
});
