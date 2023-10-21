export interface WatchRequest {
  projectId: number;
}

export interface SubscribeRequest extends WatchRequest {
  pipelineId: number;
}

export interface UnsubscribeRequest extends SubscribeRequest {
  completed: boolean;
}
