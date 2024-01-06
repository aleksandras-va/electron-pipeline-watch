import { FinishedStatus } from '../../../globalTypes';
import { projectsState } from '../../state/ProjectsState';
import { isDone } from '../../Handlers/utils/isDone';

type PipelineSummaryTuple = [projectName: string, pipelineName: string, status: FinishedStatus];
type OverallStatus = FinishedStatus | 'mixed' | null;

interface UpdateData {
  amount: number;
  projectSummaries: PipelineSummaryTuple[];
  overallStatus?: OverallStatus;
}

export function resolveUpdateData() {
  const updateData: UpdateData = { amount: 0, projectSummaries: [] };

  projectsState.projectsWithUpdates.forEach((id) => {
    const currentUpdateIds: string[] = projectsState.instance[id].lastUpdated;

    if (currentUpdateIds.length) {
      updateData.amount += currentUpdateIds.length;

      const currentProject = projectsState.instance[id];
      const allProjectPipelines = currentProject.pipelinesData;

      const statuses: PipelineSummaryTuple[] = currentUpdateIds.map((updateId) => {
        const updatedPipeline = allProjectPipelines.find((pipeline) => pipeline.id === updateId)!;

        let status: FinishedStatus;

        if (updatedPipeline && isDone(updatedPipeline?.status)) {
          status = updatedPipeline.status as FinishedStatus;
        } else {
          throw new Error(`Bad status received!, ${JSON.stringify(updatedPipeline)}`);
        }

        return [updatedPipeline.project_id, updatedPipeline.ref, status];
      });

      updateData.projectSummaries = [...updateData.projectSummaries, ...statuses];
    }
  });

  let overallStatus: OverallStatus = null;

  for (let i = 0; i < updateData.projectSummaries.length; i++) {
    const [, , currentStatus] = updateData.projectSummaries[i];

    if (i === 0) {
      overallStatus = currentStatus;
    }

    if (overallStatus !== currentStatus) {
      overallStatus = 'mixed';
      break;
    }
  }

  updateData.overallStatus = overallStatus;

  return updateData;
}
