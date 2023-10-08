import { app, BrowserWindow, ipcMain } from 'electron';
import { createWindow } from './createWindow';
import { SubscribeRequest } from './types';
import { DataBridge, IDataBridge } from './dataBridge';

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let mainWindow: BrowserWindow;
let dataBridge: IDataBridge;

app.whenReady().then(async () => {
  mainWindow = createWindow();

  app.on('activate', function () {
    // On macOS, it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  dataBridge = new DataBridge(mainWindow);

  await dataBridge.watch();
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
  await dataBridge.subscribe(payload);

  mainWindow.webContents.send('pipeline:subscriptions', dataBridge.getBridge());
});

ipcMain.on('pipeline:unsubscribe', async (_, payload: SubscribeRequest) => {
  await dataBridge.unsubscribe(payload);

  mainWindow.webContents.send('pipeline:subscriptions', dataBridge.getBridge());
});
