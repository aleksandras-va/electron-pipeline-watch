import { Project } from './components/Project';
import { useEffect, useState } from 'react';
import { PipelinePayload } from '../../globalTypes';
import { Debug } from './Debug';

export function App() {
  const [apiData, setApiData] = useState<PipelinePayload>({ active: {}, completed: {} });
  const [badges, setBadges] = useState({});

  useEffect(() => {
    electron?.ipcRenderer.on('pipeline:subscriptions', (_, args) => {
      setApiData({ ...args });
    });

    electron?.ipcRenderer.on('pipeline:update', (_, args) => {
      setApiData({ ...args });
    });

    electron?.ipcRenderer.on('badges', (_, args) => {
      setBadges({ ...args });
    });

    return () => {
      electron.ipcRenderer.removeAllListeners('pipeline:subscriptions');
      electron.ipcRenderer.removeAllListeners('pipeline:update');
      electron.ipcRenderer.removeAllListeners('badges');
    };
  }, []);

  return (
    <main className="mx-5">
      <Debug />
      <div className="my-5">
        <h1>Projects</h1>
      </div>

      <div className="d-flex gap-4">
        <Project
          id={11}
          name="Root Worker"
          activePipelines={apiData.active['11']}
          completedPipelines={apiData.completed['11']}
          badges={badges['11']}
        />
        <Project
          id={22}
          name="Stella"
          activePipelines={apiData.active['22']}
          completedPipelines={apiData.completed['22']}
          badges={badges['22']}
        />
        <Project
          id={33}
          name="Lib"
          activePipelines={apiData.active['33']}
          completedPipelines={apiData.completed['33']}
          badges={badges['33']}
        />
      </div>
    </main>
  );
}
