import { useEffect, useState } from 'react';
import { UiTimerData } from '../../../globalTypes';

interface Props {
  timerData: UiTimerData;
  frequency: number;
}

export function UpdateIndicator({ timerData, frequency }: Props) {
  const time = Math.round(frequency / 1000);
  const [timeLeft, setTimeLeft] = useState(time);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevState) => prevState - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      setTimeLeft(time);
    };
  }, [timerData, frequency]);

  return (
    <div className="update-view" key={timerData.timestamp}>
      <span className="update-view__text">Next update in: {timeLeft}</span>
    </div>
  );
}
