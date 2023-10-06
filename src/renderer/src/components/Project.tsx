import { SubscriptionCard } from './SubscriptionCard';
import { SubscribeInput } from './SubscribeInput';
import type { Pipeline } from '../../../globalTypes';

interface Props {
  id: number;
  name: string;
  apiData?: Pipeline[];
}

export function Project({ id, apiData, name }: Props) {
  return (
    <div className="w-100">
      <h2 className="mb-4">{name}</h2>
      <SubscribeInput id={id} />
      {apiData?.map((pipeline, index) => {
        return <SubscriptionCard key={index} pipeline={pipeline} />;
      })}
    </div>
  );
}
