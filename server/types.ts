export interface Pipeline {
  id: number;
  project_id: number;
  ref: string;
  status: string;
  random?: string;
  data?: string;
}

export type StaticPipelineData = { [key: string]: Pipeline[] };
