import { BrowserWindow, ipcMain } from 'electron';
import { IObserver, StateUpdateType } from '../EventManager';
import { MainToRendererChannels, RendererToMainChannels } from '../../globalConstants';
import { RequestReducer } from '../RequestReducer';
import {
  DebugPayload,
  PipelinePayload,
  ProjectPayload,
  UiPayload,
  UserPayload,
} from '../../globalTypes';
import { projectsState } from '../state/ProjectsState';
import { alertsState } from '../state/AlertsState';
import { uiState } from '../state/UiState';
import { userState } from '../state/UserState';
import WebContents = Electron.WebContents;

// TODO: split "init" function to reduce functionality for logged out session
export class Bridge implements IObserver {
  private ipcRenderer: WebContents;

  constructor(browserWindow: BrowserWindow) {
    this.ipcRenderer = browserWindow.webContents;
  }

  init() {
    ipcMain.on(RendererToMainChannels.Project, (_, payload: ProjectPayload) => {
      RequestReducer.project(payload);
    });

    ipcMain.on(RendererToMainChannels.Pipeline, (_, payload: PipelinePayload) => {
      RequestReducer.pipeline(payload);
    });

    ipcMain.on(RendererToMainChannels.Ui, (_, payload: UiPayload) => {
      RequestReducer.ui(payload);
    });

    ipcMain.on(RendererToMainChannels.Debug, (_, payload: DebugPayload) => {
      RequestReducer.debug(payload);
    });

    ipcMain.on(RendererToMainChannels.User, (_, payload: UserPayload) => {
      RequestReducer.user(payload);
    });
  }

  onObserverNotify(type: StateUpdateType) {
    switch (type) {
      case StateUpdateType.Project:
        // TODO: Minimize amount of data sent
        this.ipcRenderer.send(MainToRendererChannels.Project, {
          data: projectsState.instance,
        });
        break;
      case StateUpdateType.Ui:
        this.ipcRenderer.send(MainToRendererChannels.Ui, {
          data: uiState.instance.timerData,
        });
        break;
      case StateUpdateType.App:
        this.ipcRenderer.send(MainToRendererChannels.Project, {
          data: projectsState.instance,
        });
        break;
      case StateUpdateType.Alert:
        this.ipcRenderer.send(MainToRendererChannels.Alerts, {
          data: alertsState.instance.notifyOn,
        });
        break;
      case StateUpdateType.User:
        this.ipcRenderer.send(MainToRendererChannels.User, {
          data: userState.instance,
        });
        break;
      default:
        throw new Error(`Reached "never" case with type: "${type}"`);
    }
  }
}
