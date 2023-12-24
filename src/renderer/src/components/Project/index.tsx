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
  return (
    <ProjectContext.Provider value={id}>
      <div className="w-100">
        <sup>Unseen: {updated.length}</sup>
        <h2 className="mb-4">{name}</h2>
        <SubscriptionForm />
        <Cards pipelines={pipelines} />
      </div>
    </ProjectContext.Provider>
  );
}
