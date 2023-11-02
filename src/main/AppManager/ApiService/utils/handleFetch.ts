import { SubscribeRequest, WatchRequest } from '../../../types';
import { Pipeline } from '../../../../globalTypes';

function buildRequestUrl({ projectId, pipelineId }: { projectId: number; pipelineId?: number }) {
  const baseUrl = import.meta.env.MAIN_API_URL;

  return `${baseUrl}/${projectId}/pipelines/${pipelineId || ''}`;
}

async function handleFetch<T, K extends SubscribeRequest | WatchRequest>(request: K): Promise<T> {
  let requestUrl = buildRequestUrl(request);

  try {
    const rawData = await fetch(requestUrl);

    return await rawData.json();
  } catch (error) {
    console.warn('👎 Fetch failed.');

    throw new Error(`Tried fetching: "${requestUrl}".\nMore: ${error}`);
  }
}

export async function handleFetchPipeline(request: SubscribeRequest) {
  return handleFetch<Pipeline, SubscribeRequest>(request);
}

export async function handleFetchPipelines(request: WatchRequest) {
  return handleFetch<Pipeline[], WatchRequest>(request);
}
