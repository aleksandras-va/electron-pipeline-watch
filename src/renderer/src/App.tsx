import { useEffect, useState } from 'react';
import { NotifyOn, Projects, UiTimerData } from '../../globalTypes';
import { Debug } from './Debug';
import { Project } from './components/Project';
import { MainToRendererChannels } from '../../globalConstants';
import { UpdateIndicator } from './components/UpdateIndicator';
import { Title } from './components/Title';

export function App() {
  const [projectsMap, setProjectsMap] = useState<Projects>({});
  const [notifyOn, setNotifyOn] = useState<NotifyOn>({});
  const [timerData, setTimerData] = useState<UiTimerData>({ frequency: 0, timestamp: 0 });

  // Set "frequency" by sending constant from initialization rather that timer tick
  const [frequency, setFrequency] = useState<number | null>(null);

  useEffect(() => {
    setFrequency(10_000);

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
        <Title />
      </div>
      <div className="d-flex gap-4">
        {Object.entries(projectsMap).map(([key, value], index) => {
          return (
            <Project
              key={index}
              id={key}
              name={value.name}
              pipelines={value?.pipelinesData}
              updated={notifyOn[key]}
            />
          );
        })}
      </div>
      <Debug />
    </main>
  );
}
