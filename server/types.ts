export type PipelineData = Record<string, unknown>;

export interface PipelineFragment {
  id: number;
  iid: number;
  project_id: number;
  sha: string;
  ref: string;
  status: string;
  source: string;
  created_at: string;
  updated_at: string;
  web_url: string;
  name: string | null;
}

export interface Pipeline extends PipelineFragment {
  tag: boolean;
  user: {
    id: number;
    username: string;
    name: string;
    state: string;
    avatar_url: string;
    web_url: string;
  };
  started_at: string;
  finished_at: string;
  duration: number;
  queued_duration: number;
  detailed_status: {
    icon: string;
    text: string;
    label: string;
    group: string;
    tooltip: string;
    has_details: false;
    details_path: string;
    favicon: string;
  };
}
