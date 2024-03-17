import { Spinner } from './components/Spinner';
import { useEffect, useState } from 'react';
import { App } from './App';
import { Login } from './Login';
import { MainToRendererChannels } from '../../globalConstants';
import { UserData } from '../../globalTypes';

export function Router() {
  const [currentMode, setCurrentMode] = useState<'login' | 'app' | null>(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    electron.ipcRenderer.on(MainToRendererChannels.User, (_, payload: { data: UserData }) => {
      if (payload.data.loggedIn) {
        setCurrentMode('app');
        setUsername(payload.data.name);
      } else {
        setCurrentMode('login');
      }
    });
  }, []);

  let CurrentView: () => JSX.Element;

  if (currentMode == null) {
    CurrentView = Spinner;
  } else if (currentMode === 'app') {
    // eslint-disable-next-line react/display-name
    CurrentView = () => <App username={username} />;
  } else {
    CurrentView = Login;
  }

  return <CurrentView />;
}
