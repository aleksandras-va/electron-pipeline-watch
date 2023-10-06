export interface Pipeline {
  id: number;
  project_id: number;
  ref: string;
  status: string;
}

export type BridgeList = Record<string, Pipeline[]>;
