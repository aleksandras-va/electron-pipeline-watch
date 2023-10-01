export interface SubscribeRequest {
  projectId: number;
  pipelineId: number;
}

export type IncomingSubscriptions = Record<string, number[]>;
