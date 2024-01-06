import { SetState } from '../../types';
import { RendererToMainChannels } from '../../../../globalConstants';
import { PipelinePayload } from '../../../../globalTypes';

export async function handleSubscribe(
  projectId: string,
  inputValue: string,
  setInputValue: SetState<string>
) {
  const pipelineId = inputValue;

  if (!inputValue.length) return;

  setInputValue('');

  const payload: PipelinePayload = { action: 'add', projectId, pipelineId };

  electron.ipcRenderer.send(RendererToMainChannels.Pipeline, payload);
}
