import { Card as CardBase, CloseButton, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Pipeline, PipelinePayload } from '../../../../globalTypes';
import { RendererToMainChannels } from '../../../../globalConstants';

interface Props {
  pipeline: Pipeline;
}

export function Card({ pipeline }: Props) {
  const handleUnsubscribe = () => {
    const payload: PipelinePayload = {
      action: 'remove',
      projectId: pipeline.project_id,
      pipelineId: pipeline.id,
    };

    electron.ipcRenderer.send(RendererToMainChannels.Pipeline, payload);
  };

  const { status } = pipeline;

  let border = 'secondary';

  if (status === 'success') {
    border = 'success';
  } else if (status === 'failed') {
    border = 'danger';
  }

  return (
    <>
      <CardBase border={border} className="mb-3">
        <CardBase.Header>
          <Container fluid="xs">
            <Row className="align-items-center">
              <Col xs="auto">Watching #{pipeline.id}</Col>
              <Col className="d-flex justify-content-end">
                <CloseButton
                  className="ml-auto"
                  aria-label="Unsubscribe"
                  onClick={handleUnsubscribe}
                />
              </Col>
            </Row>
          </Container>
        </CardBase.Header>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            Status: <strong>{pipeline.status.toUpperCase()}</strong>
          </ListGroup.Item>
          <ListGroup.Item>
            Tag: <strong>{pipeline.ref}</strong>
          </ListGroup.Item>
          <ListGroup.Item>
            Info: <strong>{pipeline.data}</strong>
          </ListGroup.Item>
        </ListGroup>
      </CardBase>
    </>
  );
}
