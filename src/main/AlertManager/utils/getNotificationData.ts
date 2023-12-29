import { resolveUpdateData } from './resolveUpdateData';

interface NotificationData {
  title: string;
  body: string;
}

export function getNotificationData(): NotificationData {
  const updatesData = resolveUpdateData();

  let title: string;
  let body: string;

  if (updatesData.amount === 1) {
    const [project, pipeline, status] = updatesData.projectSummaries[0];
    const hasFailed = status === 'failed';

    // temp
    const actualProject = { '11': 'Root Worker', '22': 'Stella', '33': 'Lib' }[project]!;

    title = `Finished ${hasFailed ? '❌' : '✅'}`;
    body = `Pipeline ${pipeline}, ${actualProject} project\n${
      hasFailed ? 'Has failed.' : 'Was successful.'
    }`;
  } else {
    let icon: string;
    let statusText: string;

    if (updatesData.overallStatus === 'success') {
      icon = '✅';
      statusText = 'finished successfully';
    } else if (updatesData.overallStatus === 'failed') {
      icon = '❌';
      statusText = 'finished unsuccessfully';
    } else {
      icon = '⚠️';
      statusText = 'finished, some failed';
    }

    title = `Multiple pipelines have finished ${icon}`;
    body = `${updatesData.amount} pipelines have ${statusText}`;
  }

  return { title, body };
}
