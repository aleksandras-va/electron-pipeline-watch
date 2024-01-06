import { Pipeline } from '../../../../globalTypes';
import { SubscriptionForm } from '../SubscribtionForm';
import { Cards } from '../pipelineComponents/Cards';
import { ProjectContext } from '../context/ProjectContext';

interface Props {
  id: string;
  name: string;
  pipelines: Pipeline[];
  updated: string[];
}

export function Project({ id, name, pipelines = [], updated = [] }: Props) {
  const updates = updated.length ? 1 : 0;

  return (
    <ProjectContext.Provider value={{ id, updates }}>
      <div className="w-100">
        <h2 className="mb-4">{name}</h2>
        <SubscriptionForm />
        <Cards pipelines={pipelines} />
      </div>
    </ProjectContext.Provider>
  );
}
