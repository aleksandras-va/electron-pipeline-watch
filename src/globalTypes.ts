import { statuses } from './globalConstants';

// TODO: import these types in some document closer to processes

export type Status = (typeof statuses)[number];
export type FinishedStatus = 'failed' | 'success';

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

export type NotifyOn = Record<string, string[]>;

export type Projects = Record<string, Project>;
export type Updates = Record<string, string[]>;

export interface Notifications {
  notifyOn: NotifyOn;
}

export interface ProjectPayload {
  details: 'add' | 'remove';
  projectId: string;
}

export interface PipelinePayload {
  details: 'add' | 'remove';
  projectId: string;
  pipelineId: string;
}

export interface UiPayloadTypes {
  dropdown: {
    details: 'dropdown';
    projectId: string;
    elementState: 'expanded' | 'collapsed';
  };
  click: {
    details: 'button:click';
  };
}

export type UiPayload = UiPayloadTypes[keyof UiPayloadTypes];

export interface AppPayload {
  windowFocus: boolean;
}

export interface DebugPayload {
  details: 'update-all';
}
