import { Accordion as AccordionBase } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import { Pipeline, PipelinePayload, UiPayload } from '../../../../globalTypes';
import { Card } from './Card';
import { ProjectContext } from '../context/ProjectContext';
import { RendererToMainChannels } from '../../../../globalConstants';

interface Props {
  pipelines: Pipeline[];
}

export function CompletedCards({ pipelines }: Props) {
  const [splitStatus, setSplitStatus] = useState([0, 0]);
  const [expanded, setExpanded] = useState(false);

  const { id, updates } = useContext(ProjectContext);

  useEffect(() => {
    const status = pipelines.reduce(
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
  }, [pipelines]);

  useEffect(() => {
    const payload: UiPayload = {
      details: 'dropdown',
      projectId: id,
      elementState: expanded ? 'expanded' : 'collapsed',
    };

    electron.ipcRenderer.send(RendererToMainChannels.Ui, payload);
  }, [expanded]);

  const handleClearAll = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    const payload: PipelinePayload = {
      action: 'remove-completed',
      projectId: id,
    };

    electron.ipcRenderer.send(RendererToMainChannels.Pipeline, payload);
  };

  return (
    <div className="mb-4">
      <AccordionBase onSelect={() => setExpanded(!expanded)}>
        <AccordionBase.Item eventKey="0">
          <AccordionBase.Header>
            <div className="w-100 d-flex justify-content-between">
              <div className="accordion-header-info d-flex align-items-center">
                {pipelines.length ? (
                  updates ? (
                    <div className="accordion-header-info__indicator" />
                  ) : (
                    <div className="accordion-header-info__clear-all" onClick={handleClearAll}>
                      Clear ({pipelines?.length})
                    </div>
                  )
                ) : (
                  <div className="accordion-header-info__no-data" onClick={handleClearAll}>
                    No items
                  </div>
                )}
              </div>

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
          </AccordionBase.Header>
          <AccordionBase.Body>
            {pipelines?.map((pipeline, index) => {
              return <Card key={index} pipeline={pipeline} />;
            })}
          </AccordionBase.Body>
        </AccordionBase.Item>
      </AccordionBase>
    </div>
  );
}
