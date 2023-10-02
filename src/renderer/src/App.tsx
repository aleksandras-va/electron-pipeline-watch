import { Project } from './components/Project';
import { useEffect, useState } from 'react';
import { OutgoingSubscriptionData } from '../../globalTypes';

export function App() {
  const [apiData, setApiData] = useState<OutgoingSubscriptionData>({});

  useEffect(() => {
    electron?.ipcRenderer.on('pipeline:subscriptions', (_, args) => {
      setApiData(args);
    });

    return () => electron.ipcRenderer.removeAllListeners('pipeline:subscriptions');
  }, []);

  return (
    <main className="mx-5">
      <div className="my-5">
        <h1>Projects</h1>
      </div>

      <div className="d-flex gap-4">
        <Project id={11} name="Root Worker" apiData={apiData['11']} />
        <Project id={22} name="Stella" apiData={apiData['22']} />
        <Project id={33} name="Lib" apiData={apiData['33']} />
      </div>
    </main>
  );
}
