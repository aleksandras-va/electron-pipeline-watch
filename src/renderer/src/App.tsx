import { useEffect, useState } from 'react';
import { NotifyOn, Projects, UiTimerData } from '../../globalTypes';
import { Debug } from './Debug';
import { Project } from './components/Project';
import { MainToRendererChannels } from '../../globalConstants';

export function App() {
  const [projectsMap, setProjectsMap] = useState<Projects>({});
  const [notifyOn, setNotifyOn] = useState<NotifyOn>({});
  const [timerData, setTimerData] = useState<UiTimerData>({ frequency: 0, timestamp: 0 });

  useEffect(() => {
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
      {/*<UpdateIndicator timerData={timerData} />*/}
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
        <Project
          id={'44'}
          name={'Lib'}
          pipelines={projectsMap['44']?.pipelinesData}
          updated={notifyOn['44']}
        />
        <Project
          id={'55'}
          name={'Lib'}
          pipelines={projectsMap['55']?.pipelinesData}
          updated={notifyOn['55']}
        />
        <Project
          id={'66'}
          name={'Lib'}
          pipelines={projectsMap['66']?.pipelinesData}
          updated={notifyOn['66']}
        />
        <Project
          id={'77'}
          name={'Lib'}
          pipelines={projectsMap['77']?.pipelinesData}
          updated={notifyOn['77']}
        />
        <Project
          id={'88'}
          name={'Lib'}
          pipelines={projectsMap['88']?.pipelinesData}
          updated={notifyOn['88']}
        />
        <Project
          id={'99'}
          name={'Lib'}
          pipelines={projectsMap['99']?.pipelinesData}
          updated={notifyOn['99']}
        />
      </div>
      <Debug />
    </main>
  );
}
