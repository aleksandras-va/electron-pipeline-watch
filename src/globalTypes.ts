import { statuses } from './globalConstants';

export type Status = (typeof statuses)[number];
export type FinishedStatus = 'failed' | 'success' | 'skipped';

export interface ProjectApi {
  id: string;
  name: string;
}

export interface PipelineApi {
  id: string;
  project_id: string;
  ref: string;
  status: Status;
  data?: string;
}

export interface Pipeline {
  id: string;
  project_id: string;
  ref: string;
  status: Status;
  data?: string;
  done: boolean;
}

export interface Project {
  pipelinesData: Pipeline[];
  lastUpdated: string[];
  name: string;
  order: number;
  id: string;
  customName?: string;
}

export type UiTimerData = {
  frequency: number;
  timestamp: number;
};

export type NotifyOn = Record<string, string[]>;
export type Projects = Record<string, Project>;

export interface Ui {
  dropdown: Record<string, 'expanded' | 'collapsed'>;
  timerData: UiTimerData;
}

export interface Notifications {
  notifyOn: NotifyOn;
}

export interface ProjectPayloadTypes {
  add: {
    action: 'add';
    projectId: string;
    projectCustomName?: string;
  };
  remove: {
    action: 'remove';
    projectId: string;
  };
}

export type ProjectPayload = ProjectPayloadTypes[keyof ProjectPayloadTypes];

export interface PipelinePayloadTypes {
  add: {
    action: 'add';
    projectId: string;
    pipelineId: string;
  };
  remove: {
    action: 'remove';
    projectId: string;
    pipelineId: string;
  };
  removeCompleted: {
    action: 'remove-completed';
    projectId: string;
  };
  updateAll: {
    action: 'update-all';
  };
}

export type PipelinePayload = PipelinePayloadTypes[keyof PipelinePayloadTypes];

export interface UiPayloadTypes {
  dropdown: {
    action: 'dropdown';
    projectId: string;
    elementState: 'expanded' | 'collapsed';
  };
  timerUpdate: {
    action: 'timer-update';
    frequency: number;
    timestamp: number;
  };
}

export type UiPayload = UiPayloadTypes[keyof UiPayloadTypes];

export interface AppPayload {
  windowFocus: boolean;
}

export interface DebugPayload {
  details: 'update-all';
}

export interface UserData {
  loggedIn: boolean;
  name: string;
  settings: unknown;
}

interface UserPayloadTypes {
  startupCheck: {
    action: 'startup-check';
  };
  sessionCheck: {
    action: 'session-check';
  };
  login: {
    action: 'login';
    username: string;
    apiKey: string;
    frequency: string;
  };
  logout: {
    action: 'logout';
  };
}

export type UserPayload = UserPayloadTypes[keyof UserPayloadTypes];
