export interface PipelineData {
  id: number;
  project_id: number;
  ref: string;
  status: string;
  created_at: string;
  updated_at: string;
  tag: boolean;
  started_at: string;
  finished_at: string;
  duration: number;
}

export type OutgoingSubscriptionData = Record<string, PipelineData[]>;
