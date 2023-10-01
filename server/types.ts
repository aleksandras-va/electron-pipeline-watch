export type PipelineData = Record<string, unknown>;

export interface PipelineFragment {
  id: number;
  project_id: number;
  ref: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Pipeline extends PipelineFragment {
  tag: boolean;
  started_at: string;
  finished_at: string;
  duration: number;
}
