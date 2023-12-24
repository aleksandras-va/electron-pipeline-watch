export interface WatchRequest {
  projectId: string;
}

export interface SubscribeRequest extends WatchRequest {
  pipelineId: string;
}
