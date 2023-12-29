import { useEffect, useState } from 'react';
import { NotifyOn, Projects } from '../../globalTypes';
import { Debug } from './Debug';
import { Project } from './components/Project';
import { MainToRendererChannels } from '../../globalConstants';

export function App() {
  const [projectsMap, setProjectsMap] = useState<Projects>({});
  const [notifyOn, setNotifyOn] = useState<NotifyOn>({});

  useEffect(() => {
    // Projects
    electron.ipcRenderer.on(MainToRendererChannels.Project, (_, payload: { data: Projects }) => {
      setProjectsMap(payload.data);
    });

    // Alerts
    electron.ipcRenderer.on(MainToRendererChannels.Alerts, (_, payload: { data: NotifyOn }) => {
      setNotifyOn(payload.data);
    });

    return () => {
      electron.ipcRenderer.removeAllListeners(MainToRendererChannels.Project);
      electron.ipcRenderer.removeAllListeners(MainToRendererChannels.Alerts);
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
          id={'11'}
          name={'Root Worker'}
          pipelines={projectsMap['11']?.pipelinesData}
          updated={notifyOn['11']}
        />
        <Project
          id={'22'}
          name={'Stella'}
          pipelines={projectsMap['22']?.pipelinesData}
          updated={notifyOn['22']}
        />
        <Project
          id={'33'}
          name={'Lib'}
          pipelines={projectsMap['33']?.pipelinesData}
          updated={notifyOn['33']}
        />
      </div>
    </main>
  );
}
