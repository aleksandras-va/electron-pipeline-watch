import { Card, CloseButton, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Pipeline } from '../../../../globalTypes';

interface Props {
  pipeline: Pipeline;
}

export function SubscriptionCard({ pipeline }: Props) {
  return (
    <>
      <Card border={'secondary'} className="mb-3">
        <Card.Header>
          {/*Header*/}
          <Container fluid="xs">
            <Row className="align-items-center">
              <Col xs="auto">Watching #{pipeline.id}</Col>
              <Col className="d-flex justify-content-end">
                <CloseButton className="ml-auto" aria-label="Unsubscribe" />
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
        </ListGroup>
      </Card>
    </>
  );
}
