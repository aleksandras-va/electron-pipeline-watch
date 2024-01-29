import { SubscribeRequest, WatchRequest } from '../../types';
import { PipelineApi, ProjectApi } from '../../../globalTypes';

async function handleFetch<T>(path: string): Promise<T> {
  const baseUrl = import.meta.env.MAIN_MOCK_API_URL;
  const requestUrl = `${baseUrl}${path}`;

  try {
    const rawData = await fetch(requestUrl);

    return await rawData.json();
  } catch (error) {
    console.warn('👎 Fetch failed.');

    throw new Error(`Tried fetching: "${requestUrl}".\nMore: ${error}`);
  }
}

export async function fetchPipeline(request: SubscribeRequest) {
  const { projectId, pipelineId } = request;
  const url = `/${projectId}/pipelines/${pipelineId}`;

  return handleFetch<PipelineApi>(url);
}

export async function fetchPipelines(request: WatchRequest) {
  const { projectId } = request;

  return handleFetch<PipelineApi[]>(`/${projectId}/pipelines`);
}

export async function fetchProject(projectId: string) {
  return handleFetch<ProjectApi>(`/${projectId}`);
}
