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
  App = 'app-update',
  Pipeline = 'pipeline-update',
  Project = 'project-update',
  Ui = 'ui-update',
  User = 'user-update',
}

export enum RendererToMainChannels {
  Debug = 'debug-action',
  Pipeline = 'pipeline-action',
  Project = 'project-action',
  Ui = 'ui-action',
  User = 'user-action',
}
