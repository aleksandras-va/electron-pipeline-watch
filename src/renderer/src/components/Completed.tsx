import { Accordion } from 'react-bootstrap';
import { SubscriptionCard } from './SubscriptionCard';
import { Pipeline } from '../../../globalTypes';
import { useEffect, useState } from 'react';

interface Props {
  completedPipelines?: Pipeline[];
}

export function Completed({ completedPipelines }: Props) {
  const [splitStatus, setSplitStatus] = useState([0, 0]);

  useEffect(() => {
    const status = completedPipelines!.reduce(
      (accumulator, { status }) => {
        if (status === 'success') {
          accumulator[0]++;
        } else if (status === 'failed') {
          accumulator[1]++;
        }

        return accumulator;
      },
      [0, 0]
    );

    setSplitStatus(status);
  }, [completedPipelines]);

  return (
    <div className="mb-4">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className="w-100 d-flex justify-content-between">
              <div>Completed ({completedPipelines?.length})</div>
              <div className="px-2 d-flex">
                <div className="indicator d-flex align-items-center px-2">
                  <div className="indicator_icon d-inline-block  rounded-circle bg-success" />
                  <div className="indicator_number d-inline-block mx-1">{splitStatus[0]}</div>
                </div>
                <div className="indicator d-flex align-items-center">
                  <div className="indicator_icon d-inline-block  rounded-circle bg-danger" />
                  <div className="indicator_number d-inline-block mx-1">{splitStatus[1]}</div>
                </div>
              </div>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            {completedPipelines?.map((pipeline, index) => {
              return <SubscriptionCard key={index} pipeline={pipeline} completed={true} />;
            })}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
