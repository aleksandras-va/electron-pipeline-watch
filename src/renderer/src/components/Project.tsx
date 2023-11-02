import { SubscriptionCard } from './SubscriptionCard';
import { SubscribeInput } from './SubscribeInput';
import type { Pipeline } from '../../../globalTypes';
import { Completed } from './Completed';
import { useEffect } from 'react';

interface Props {
  id: number;
  name: string;
  activePipelines?: Pipeline[];
  completedPipelines?: Pipeline[];
  badges?: any;
}

export function Project({ id, activePipelines, completedPipelines, name, badges }: Props) {
  useEffect(() => {}, [activePipelines]);
  useEffect(() => {}, [completedPipelines]);

  return (
    <div className="w-100">
      <h2 className="mb-4">{name}</h2>
      <div>Done: {badges || 0}</div>
      <SubscribeInput id={id} />
      {!!completedPipelines?.length && (
        <Completed completedPipelines={completedPipelines} id={id} />
      )}
      {activePipelines?.map((pipeline, index) => {
        return <SubscriptionCard key={index} pipeline={pipeline} />;
      })}
    </div>
  );
}
