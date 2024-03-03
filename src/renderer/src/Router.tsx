import { Spinner } from './components/Spinner';
import { useEffect, useState } from 'react';
import { App } from './App';
import { Login } from './Login';
import { MainToRendererChannels } from '../../globalConstants';
import { UserSettings } from '../../globalTypes';

export function Router() {
  const [currentMode, setCurrentMode] = useState<'login' | 'app' | null>(null);

  useEffect(() => {
    electron.ipcRenderer.on(MainToRendererChannels.User, (_, payload: { data: UserSettings }) => {
      if (payload.data.loggedIn) {
        setCurrentMode('app');
      } else {
        setCurrentMode('login');
      }
    });
  }, []);

  let CurrentView: () => JSX.Element;

  if (currentMode == null) {
    CurrentView = Spinner;
  } else if (currentMode === 'app') {
    CurrentView = App;
  } else {
    CurrentView = Login;
  }

  return <CurrentView />;
}
