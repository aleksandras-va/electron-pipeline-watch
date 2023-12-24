import { Pipeline } from '../../../../globalTypes';
import { CompletedCards } from './CompletedCards';
import { useEffect, useState } from 'react';
import { RunningCards } from './RunningCards';

interface Props {
  pipelines: Pipeline[];
}

export function Cards({ pipelines }: Props) {
  const [running, setRunning] = useState<Pipeline[]>([]);
  const [completed, setCompleted] = useState<Pipeline[]>([]);

  useEffect(() => {
    const newCompleted: Pipeline[] = [];
    const newRunning: Pipeline[] = [];

    pipelines.forEach((pipeline) => {
      if (pipeline.done) {
        newCompleted.push(pipeline);
      } else {
        newRunning.push(pipeline);
      }
    });

    setCompleted(newCompleted);
    setRunning(newRunning);
  }, [pipelines]);

  return (
    <>
      <CompletedCards pipelines={completed} />
      <RunningCards pipelines={running} />
    </>
  );
}
