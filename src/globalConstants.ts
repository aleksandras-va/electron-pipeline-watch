export const statuses = [
  'created',
  'pending',
  'running',
  'success',
  'failed',
  'canceled',
  'skipped',
] as const;

export enum MainToRendererChannels {
  Alerts = 'alerts-update',
  Pipeline = 'pipeline-update',
  Project = 'project-update',
  Ui = 'ui-update',
}

export enum RendererToMainChannels {
  Debug = 'debug-action',
  Pipeline = 'pipeline-action',
  Project = 'project-action',
  Ui = 'ui-action',
}
