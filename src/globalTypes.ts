export interface Pipeline {
  id: number;
  project_id: number;
  ref: string;
  status: string;
  random?: string;
  data?: string;
}

export type BridgeList = Record<string, Pipeline[]>;

export interface PipelinePayload {
  active: BridgeList;
  completed: BridgeList;
}
