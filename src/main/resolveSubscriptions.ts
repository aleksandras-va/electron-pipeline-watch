import type { SubscribeRequest } from './types';
import type { BridgeList } from '../globalTypes';

export async function resolveSubscriptions(
  subscribeRequest: SubscribeRequest,
  outgoingSubscriptionData: BridgeList
): Promise<BridgeList> {
  const { projectId, pipelineId } = subscribeRequest;

  if (!outgoingSubscriptionData[projectId]) {
    outgoingSubscriptionData[projectId] = [];
  }

  const requestUrl = `http://localhost:3002/${projectId}/pipelines/${pipelineId}`;

  try {
    const rawData = await fetch(requestUrl);
    const data = await rawData.json();

    outgoingSubscriptionData[projectId].unshift(data);

    return outgoingSubscriptionData;
  } catch (error) {
    throw new Error(`Fetch for "${requestUrl}" has failed! More: ${error}`);
  }
}
