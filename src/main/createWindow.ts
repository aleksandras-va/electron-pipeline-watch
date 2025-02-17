import path, { join } from 'path';
import { is } from '@electron-toolkit/utils';
import { BrowserWindow, shell } from 'electron';
import { fileURLToPath } from 'url';
import { eventManager } from './EventManager';
import { AlertsManager } from './AlertsManager';
import { AppRoutines } from './controllers/AppRoutines';
import { Bridge } from './controllers/Bridge';
import { RequestReducer } from './RequestReducer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createWindow() {
  const mainWindow = new BrowserWindow({
    width: is.dev ? 1400 : 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });

  if (is.dev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  const bridge = new Bridge(mainWindow);
  const appRoutines = new AppRoutines();
  const alertManager = new AlertsManager(mainWindow);

  bridge.init();
  appRoutines.init();

  eventManager.subscribe(alertManager);
  eventManager.subscribe(bridge);

  mainWindow.webContents.once('dom-ready', () => {
    RequestReducer.user({ action: 'session-check' });
  });

  return mainWindow;
}
