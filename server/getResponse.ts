import { branchPipeline } from './data/branch-pipeline';
import { tagPipeline } from './data/tag-pipeline';
import { allPipelines } from './data/pipelines';
import { Pipeline, PipelineFragment } from './types';

function setStatus(
  data: Pipeline,
  countdownActive: boolean,
  statusOverride: string | false
): Pipeline {
  const dataClone = { ...data };

  if (statusOverride) {
    dataClone.status = statusOverride;

    return dataClone;
  }

  dataClone.status = countdownActive ? 'running' : 'success';

  return dataClone;
}

export function getPipelines(): PipelineFragment[] {
  return allPipelines;
}

export function getPipeline(
  isTag: boolean,
  countdownActive: boolean,
  statusOverride: string | false
) {
  if (isTag) return setStatus(tagPipeline, countdownActive, statusOverride);

  return setStatus(branchPipeline, countdownActive, statusOverride);
}
