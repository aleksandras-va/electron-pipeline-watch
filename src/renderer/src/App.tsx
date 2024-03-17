import { useEffect, useState } from 'react';
import { NotifyOn, Project, Projects, UiTimerData, UserData } from '../../globalTypes';
import { Debug } from './Debug';
import { ProjectView } from './components/ProjectView';
import { MainToRendererChannels } from '../../globalConstants';
import { UpdateIndicator } from './components/UpdateIndicator';
import { Title } from './components/Title';
import { AppContext } from './components/context/AppContext';
import { User } from './components/User';

interface Props {
  username: string;
}

export function App({ username }: Props) {
  const [rawProjects, setRawProjects] = useState<Projects>({});
  const [rawIndicatorData, setRawIndicatorData] = useState<NotifyOn>({});
  const [rawTimerData, setRawTimerData] = useState<UiTimerData>({ frequency: 0, timestamp: 0 });

  const [projects, setProjects] = useState<Project[]>([]);

  // Set "frequency" by sending constant from initialization rather that timer tick
  const [frequency, setFrequency] = useState<number | null>(null);

  useEffect(() => {
    setFrequency(10_000);

    // Projects
    electron.ipcRenderer.on(MainToRendererChannels.Project, (_, payload: { data: Projects }) => {
      setRawProjects(payload.data);
    });

    // Alerts
    electron.ipcRenderer.on(MainToRendererChannels.Alerts, (_, payload: { data: NotifyOn }) => {
      setRawIndicatorData(payload.data);
    });

    // UI
    electron.ipcRenderer.on(MainToRendererChannels.Ui, (_, payload: { data: UiTimerData }) => {
      setRawTimerData(payload.data);
    });

    // User
    electron.ipcRenderer.on(MainToRendererChannels.User, (_, payload: { data: UserData }) => {
      console.log(payload);
    });

    return () => {
      electron.ipcRenderer.removeAllListeners(MainToRendererChannels.Project);
      electron.ipcRenderer.removeAllListeners(MainToRendererChannels.Alerts);
      electron.ipcRenderer.removeAllListeners(MainToRendererChannels.Ui);
    };
  }, []);

  // Sort projects
  useEffect(() => {
    const sortedProjects = Object.values(rawProjects);

    sortedProjects.sort((a, b) => a.order - b.order);

    setProjects(sortedProjects);
  }, [rawProjects]);

  return (
    <AppContext.Provider value={{ registeredIds: Object.keys(rawProjects) }}>
      <main className="mx-5">
        {frequency && <UpdateIndicator timerData={rawTimerData} frequency={frequency} />}
        <div className="d-flex justify-content-between my-5">
          <Title />
          <User username={username} />
        </div>
        <div className="d-flex gap-4">
          {projects.map(({ id, name, pipelinesData, order, customName }, index) => {
            return (
              <ProjectView
                key={index}
                id={id}
                name={customName || name}
                pipelines={pipelinesData}
                updated={rawIndicatorData[id]}
                order={order}
              />
            );
          })}
        </div>
        <Debug />
      </main>
    </AppContext.Provider>
  );
}
