import { SubscriptionCard } from './SubscriptionCard';
import { SubscribeInput } from './SubscribeInput';
import type { PipelineData } from '../../../globalTypes';

interface Props {
  id: number;
  apiData?: PipelineData[];
}

export function Project({ id, apiData }: Props) {
  console.log(apiData, 'dla');

  return (
    <div className="w-100">
      <h2 className="mb-4">Root Worker</h2>
      <SubscribeInput id={id} />
      {apiData?.map((pipeline, index) => {
        console.log(pipeline);
        return <SubscriptionCard key={index} pipeline={pipeline} />;
      })}
    </div>
  );
}
