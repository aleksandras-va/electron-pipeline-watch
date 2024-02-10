import { Pipeline, ProjectPayload } from '../../../../globalTypes';
import { SubscriptionForm } from '../SubscribtionForm';
import { Cards } from '../pipelineComponents/Cards';
import { ProjectContext } from '../context/ProjectContext';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { CloseButton } from 'react-bootstrap';
import { RendererToMainChannels } from '../../../../globalConstants';

interface Props {
  id: string;
  name: string;
  pipelines: Pipeline[];
  updated: string[];
  order: number;
}

export function ProjectView({ id, name, pipelines = [], updated = [], order }: Props) {
  const updates = updated.length ? 1 : 0;
  const parsedName = name.split('-').map(capitalizeFirstLetter).join(' ');

  const handleProjectRemove = () => {
    const payload: ProjectPayload = {
      action: 'remove',
      projectId: id,
    };

    electron.ipcRenderer.send(RendererToMainChannels.Project, payload);
  };

  return (
    <ProjectContext.Provider value={{ id, updates }}>
      <div className="w-100">
        <div className="d-flex justify-content-between">
          <h2 className="mb-4">
            {parsedName}, Order: {order}
          </h2>
          <CloseButton onClick={handleProjectRemove} />
        </div>
        <SubscriptionForm />
        <Cards pipelines={pipelines} />
      </div>
    </ProjectContext.Provider>
  );
}
