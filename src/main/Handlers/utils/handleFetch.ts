import { SubscribeRequest, WatchRequest } from '../../types';
import { Pipeline } from '../../../globalTypes';

function buildRequestUrl({ projectId, pipelineId }: { projectId: string; pipelineId?: string }) {
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

export async function fetchPipeline(request: SubscribeRequest) {
  return handleFetch<Pipeline, SubscribeRequest>(request);
}

export async function fetchPipelines(request: WatchRequest) {
  return handleFetch<Pipeline[], WatchRequest>(request);
}

export async function fetchPipelines2(request: WatchRequest) {
  void request;
  try {
    const rawData = await fetch('https://swapi.dev/api/people/1');

    const data = await rawData.json();
    console.log('fetchin', data.name);
    return data;
  } catch (error) {
    console.warn('👎 Fetch failed.');

    throw new Error(`Tried fetching: "${'https://swapi.dev/api/people/1'}".\nMore: ${error}`);
  }
}
