export function Debug() {
  return (
    <div className="debug-bar">
      <button
        onClick={() => {
          electron.ipcRenderer.send('debug:manual-fetch');
        }}
      >
        Force Fetch
      </button>
    </div>
  );
}
