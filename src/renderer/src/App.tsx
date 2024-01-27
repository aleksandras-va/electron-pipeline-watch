import { useEffect, useState } from 'react';
import { NotifyOn, Projects, UiTimerData } from '../../globalTypes';
import { Debug } from './Debug';
import { Project } from './components/Project';
import { MainToRendererChannels } from '../../globalConstants';
import { UpdateIndicator } from './components/UpdateIndicator';

export function App() {
  const [projectsMap, setProjectsMap] = useState<Projects>({});
  const [notifyOn, setNotifyOn] = useState<NotifyOn>({});
  const [timerData, setTimerData] = useState<UiTimerData>({ frequency: 0, timestamp: 0 });

  // Set "frequency" by sending constant from initialization rather that timer tick
  const [frequency, setFrequency] = useState<number | null>(null);

  useEffect(() => {
    setFrequency(5020);

    // Projects
    electron.ipcRenderer.on(MainToRendererChannels.Project, (_, payload: { data: Projects }) => {
      setProjectsMap(payload.data);
    });

    // Alerts
    electron.ipcRenderer.on(MainToRendererChannels.Alerts, (_, payload: { data: NotifyOn }) => {
      setNotifyOn(payload.data);
    });

    // UI
    electron.ipcRenderer.on(MainToRendererChannels.Ui, (_, payload: { data: UiTimerData }) => {
      setTimerData(payload.data);
    });

    return () => {
      electron.ipcRenderer.removeAllListeners(MainToRendererChannels.Project);
      electron.ipcRenderer.removeAllListeners(MainToRendererChannels.Alerts);
      electron.ipcRenderer.removeAllListeners(MainToRendererChannels.Ui);
    };
  }, []);

  return (
    <main className="mx-5">
      {frequency && <UpdateIndicator timerData={timerData} frequency={frequency} />}
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
      <Debug />
    </main>
  );
}
