export interface SubscribeRequest {
  projectId: number;
  pipelineId: number;
}

export type ReferenceList = Record<string, number[]>;
