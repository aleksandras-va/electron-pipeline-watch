import {app, BrowserWindow, ipcMain} from 'electron';
import {createWindow} from './createWindow';
import {IncomingSubscriptions, SubscribeRequest} from './types';
import {resolveSubscriptions} from './resolveSubscriptions';
import {OutgoingSubscriptionData} from '../globalTypes';


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

let mainWindow: BrowserWindow

app.whenReady().then(() => {
  mainWindow = createWindow();

  app.on('activate', function () {
    // On macOS, it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const incomingSubscriptions: IncomingSubscriptions = {};

let outgoingSubscriptionData: OutgoingSubscriptionData = {};

ipcMain.on('pipeline:subscribe', async (_, payload: SubscribeRequest) => {
  const { projectId, pipelineId } = payload;

  if (!incomingSubscriptions[projectId]) {
    incomingSubscriptions[projectId] = [];
  }

  if (incomingSubscriptions[projectId].includes(pipelineId)) {
    // TODO: add error handling
    return;
  }

  incomingSubscriptions[projectId].push(pipelineId);

  outgoingSubscriptionData = { ...(await resolveSubscriptions(payload, outgoingSubscriptionData)) };

  mainWindow.webContents.send('pipeline:subscriptions', outgoingSubscriptionData);
});

// startPipelineWatcher(mainWindow);

app.on('browser-window-created', () => {
  console.log(mainWindow);

  console.log('created!');
});
