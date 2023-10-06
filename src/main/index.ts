import {app, BrowserWindow, ipcMain} from 'electron';
import {createWindow} from './createWindow';
import {ReferenceList, SubscribeRequest} from './types';
import {resolveSubscriptions} from './resolveSubscriptions';
import {BridgeList} from '../globalTypes';
import {startPipelineWatcher} from './startPipelineWatcher';


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

const referenceList: ReferenceList = {};

let mainWindow: BrowserWindow;
let bridgeList: BridgeList = {};

app.whenReady().then(async () => {
  mainWindow = createWindow();

  app.on('activate', function () {
    // On macOS, it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  await startPipelineWatcher(mainWindow, referenceList, bridgeList);
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
  const { projectId, pipelineId } = payload;

  if (!referenceList[projectId]) {
    referenceList[projectId] = [];
  }

  if (referenceList[projectId].includes(pipelineId)) {
    // TODO: add error handling
    return;
  }

  referenceList[projectId].push(pipelineId);

  bridgeList = { ...(await resolveSubscriptions(payload, bridgeList)) };

  mainWindow.webContents.send('pipeline:subscriptions', bridgeList);
});


