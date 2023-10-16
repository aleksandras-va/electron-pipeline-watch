export interface SubscribeRequest {
  projectId: number;
  pipelineId: number;
}

export interface UnsubscribeRequest extends SubscribeRequest {
  completed: boolean;
}
