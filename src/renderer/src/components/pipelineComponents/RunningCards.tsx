import { Card } from './Card';
import { Pipeline } from '../../../../globalTypes';

interface Props {
  pipelines: Pipeline[];
}

export function RunningCards({ pipelines }: Props) {
  return (
    <>
      {pipelines.map((pipeline, index) => (
        <Card key={index} pipeline={pipeline} />
      ))}
    </>
  );
}
