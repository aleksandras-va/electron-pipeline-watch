export interface Pipeline {
  id: number;
  project_id: number;
  ref: string;
  status: string;
  random?: string;
  data?: string;
}

export type PipelinesMap = Record<string, Pipeline[]>;

export interface PipelinePayload {
  active: PipelinesMap;
  completed: PipelinesMap;
}
