import { SetState } from '../../types';

interface Payload {
  projectId: number;
  pipelineId: number;
}

export async function handleSubscribe(
  projectId: number,
  inputValue: string,
  setInputValue: SetState<string>,
  setErrorMessages: SetState<string>
) {
  const pipelineId = Number(inputValue);

  if (!inputValue.length) return;

  setInputValue('');

  if (isNaN(pipelineId)) {
    setErrorMessages('ID must be a number');
    return;
  } else {
    setErrorMessages('');
  }

  const payload: Payload = { projectId, pipelineId };

  electron.ipcRenderer.send('pipeline:subscribe', payload);
}
