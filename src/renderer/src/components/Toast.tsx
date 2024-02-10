import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { SetState } from '../types';

interface Props {
  show: boolean;
  setShow: SetState<boolean>;
}

export function ShowToast({ show, setShow }: Props) {
  return (
    <ToastContainer position={'bottom-end'}>
      <Toast onClose={() => setShow(false)} show={show} delay={3000} bg={'danger'}>
        <Toast.Header>
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>Something is wrong</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
