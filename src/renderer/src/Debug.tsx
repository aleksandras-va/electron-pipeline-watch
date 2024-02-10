import { RendererToMainChannels } from '../../globalConstants';
import { useState } from 'react';
import { DebugPayload, ProjectPayload } from '../../globalTypes';

export function Debug() {
  const [delayedUpdate, setDelayedUpdate] = useState(0);

  return (
    <div className="debug-bar">
      <div>
        <button
          style={{ marginRight: '20px' }}
          onClick={() => {
            const payload: ProjectPayload = {
              action: 'add',
              projectId: String(Math.random()),
              projectCustomName: '',
            };

            electron.ipcRenderer.send(RendererToMainChannels.Project, payload);
          }}
        >
          Quick add project
        </button>
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
          Force Delayed Fetch
        </button>
      </div>

      <button
        onClick={() => {
          const payload: DebugPayload = { details: 'update-all' };

          electron.ipcRenderer.send(RendererToMainChannels.Debug, payload);
        }}
      >
        Force Fetch
      </button>
    </div>
  );
}
