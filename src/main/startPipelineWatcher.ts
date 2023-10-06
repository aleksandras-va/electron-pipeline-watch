import { BrowserWindow } from 'electron';
import { BridgeList, Pipeline } from '../globalTypes';
import { ReferenceList } from './types';

export async function startPipelineWatcher(
  mainWindow: BrowserWindow,
  referenceList: ReferenceList,
  bridgeList: BridgeList
) {
  setInterval(async () => {
    void bridgeList;

    const projectsList = Object.keys(referenceList);

    const results: Pipeline[][] = await Promise.all(
      projectsList.map(async (projectId) => {
        const rawData = await fetch(`http://localhost:3002/${projectId}/pipelines/`);

        return rawData.json();
      })
    );

    const mappedResults: Map<number, Record<string, Pipeline>> = new Map();

    results.flat().forEach((pipeline) => {
      let projectsPipelines = mappedResults.get(pipeline.project_id);

      if (!projectsPipelines) {
        projectsPipelines = {};
        mappedResults.set(pipeline.project_id, projectsPipelines);
      }

      projectsPipelines[pipeline.id] = pipeline;
    });

    // Update the bridgeList with new data
    Object.entries(bridgeList).forEach(([projectId, pipelines]) => {
      const updatedData = mappedResults.get(Number(projectId));

      pipelines.forEach((pipeline) => {
        pipeline.status = updatedData![pipeline.id].status;
      });
    });

    mainWindow.webContents.send('pipeline:update', bridgeList);
  }, 5000);
}
