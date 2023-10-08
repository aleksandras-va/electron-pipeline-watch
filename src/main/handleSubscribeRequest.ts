import type { SubscribeRequest } from './types';
import type { BridgeList } from '../globalTypes';

export async function handleSubscribeRequest(
  request: SubscribeRequest,
  bridgeList: BridgeList
): Promise<void> {
  const { projectId, pipelineId } = request;

  if (!bridgeList[projectId]) {
    bridgeList[projectId] = [];
  }

  const requestUrl = `http://localhost:3002/${projectId}/pipelines/${pipelineId}`;

  try {
    const rawData = await fetch(requestUrl);
    const data = await rawData.json();

    bridgeList[projectId].unshift(data);
  } catch (error) {
    throw new Error(`Fetch for "${requestUrl}" has failed! More: ${error}`);
  }
}
