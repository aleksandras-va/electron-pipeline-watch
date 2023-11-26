export interface Pipeline {
  id: string;
  project_id: string;
  ref: string;
  status: string;
  random?: string;
  data?: string;
}

export type StaticPipelineData = { [key: string]: Pipeline[] };
