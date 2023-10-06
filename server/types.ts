export interface Pipeline {
  id: number;
  project_id: number;
  ref: string;
  status: string;
}

export type StaticPipelineData = { [key: string]: Pipeline[] };
