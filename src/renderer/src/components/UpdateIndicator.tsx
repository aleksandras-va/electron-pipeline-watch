import { useEffect, useState } from 'react';
import { UiTimerData } from '../../../globalTypes';
import cx from 'classnames';

interface Props {
  timerData: UiTimerData;
}

export function UpdateIndicator({ timerData }: Props) {
  const { frequency } = timerData;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(true), 100);

    return () => {
      setLoading(false);
    };
  }, [timerData]);

  return (
    <div className="update-view" key={timerData.timestamp}>
      <span className="update-view__text">Next update:</span>
      <div
        className={cx('update-view__indicator', loading && 'red')}
        style={{ transitionDuration: `${frequency}ms` }}
      />
    </div>
  );
}
