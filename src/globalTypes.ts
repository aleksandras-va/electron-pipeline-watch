import { statuses } from './globalConstants';

// TODO: import these types in some document closer to processes

export type Status = (typeof statuses)[number];
export type FinishedStatus = 'failed' | 'success' | 'skipped';

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

export interface ProjectPayload {
  details: 'add' | 'remove';
  projectId: string;
}

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
