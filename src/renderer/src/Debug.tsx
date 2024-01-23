import { RendererToMainChannels } from '../../globalConstants';
import { useState } from 'react';
import { DebugPayload } from '../../globalTypes';

export function Debug() {
  const [delayedUpdate, setDelayedUpdate] = useState(0);

  return (
    <div className="debug-bar">
      <div>
        Delayed updates: {delayedUpdate}{' '}
        <button
          style={{ marginRight: '20px' }}
          onClick={() => {
            setTimeout(() => {
              const payload: DebugPayload = { details: 'update-all' };

              electron.ipcRenderer.send(RendererToMainChannels.Debug, payload);

              setDelayedUpdate(delayedUpdate + 1);
            }, 2000);
          }}
        >
          Force Delayed Fetch 2
        </button>
      </div>

      <button
        onClick={() => {
          const payload: DebugPayload = { details: 'update-all' };

          // setInterval(() => electron.ipcRenderer.send(RendererToMainChannels.Debug, payload), 5000);
          electron.ipcRenderer.send(RendererToMainChannels.Debug, payload);
        }}
      >
        Force Fetch
      </button>
    </div>
  );
}
