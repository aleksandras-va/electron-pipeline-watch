import type { SubscribeRequest } from './types';
import type { OutgoingSubscriptionData } from '../globalTypes';

export async function resolveSubscriptions(
  subscribeRequest: SubscribeRequest,
  outgoingSubscriptionData: OutgoingSubscriptionData
): Promise<OutgoingSubscriptionData> {
  const { projectId, pipelineId } = subscribeRequest;

  if (!outgoingSubscriptionData[projectId]) {
    outgoingSubscriptionData[projectId] = [];
  }

  try {
    const rawData = await fetch(`http://localhost:3002/${projectId}/pipelines/${pipelineId}`);
    const data = await rawData.json();

    outgoingSubscriptionData[projectId].unshift(data);

    return outgoingSubscriptionData;
  } catch (error) {
    throw new Error(`Fetch failed! More: ${error}`);
  }
}
