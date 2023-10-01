import { Pipeline, PipelineFragment } from './types';

const refData = {
  '111': 'feat/enable-dropdown-features',
  '222': 'v1.502.0',
  '333': 'fix/resize-window',
  '444': 'v1.501.0',
  '555': 'chore/update-docs',
};

const tagData = {
  '222': true,
  '444': true,
};

export function getPipelines(projectId: string): PipelineFragment[] {
  return Object.entries(refData).map(([key, value]) => {
    return {
      id: Number(key),
      project_id: Number(projectId),
      ref: value,
      status: 'success',
      created_at: '2023-09-20T10:20:00.000Z',
      updated_at: '2023-09-20T10:30:00.000Z',
    };
  });
}

export function getPipeline(
  projectId: string,
  pipelineId: string,
  countdownActive: boolean,
  statusOverride?: string
): Pipeline {
  return {
    id: Number(pipelineId),
    project_id: Number(projectId),
    ref: refData[pipelineId] || 'feat/basic-feature',
    status: statusOverride || (countdownActive ? 'running' : 'success'),
    created_at: '2023-09-20T10:20:00.000Z',
    updated_at: '2023-09-20T10:30:00.000Z',
    tag: tagData[pipelineId] || false,
    started_at: '2023-09-20T10:25:00.000Z',
    finished_at: '2023-09-20T10:28:00.000Z',
    duration: 564,
  };
}
