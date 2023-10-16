import { Card, CloseButton, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Pipeline } from '../../../../globalTypes';

interface Props {
  pipeline: Pipeline;
  completed?: boolean;
}

export function SubscriptionCard({ pipeline, completed = false }: Props) {
  const handleUnsubscribe = () => {
    electron.ipcRenderer.send('pipeline:unsubscribe', {
      projectId: pipeline.project_id,
      pipelineId: pipeline.id,
      completed,
    });
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
      <Card border={border} className="mb-3">
        <Card.Header>
          {/*Header*/}
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
        </Card.Header>
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
      </Card>
    </>
  );
}
