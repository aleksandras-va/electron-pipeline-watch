import { useContext, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { SetState } from '../types';
import { ProjectPayload } from '../../../globalTypes';
import { RendererToMainChannels } from '../../../globalConstants';
import { AppContext } from './context/AppContext';
import { ShowToast } from './Toast';

interface Props {
  showModal: boolean;
  setShowModal: SetState<boolean>;
}

export function ProjectModal({ showModal, setShowModal }: Props) {
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const idInputRef = useRef<HTMLInputElement | null>(null);
  const { registeredIds } = useContext(AppContext);
  const [showToast, setShowToast] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    if (nameInputRef?.current && idInputRef?.current) {
      const id = idInputRef.current.value;

      if (registeredIds.includes(id)) {
        setShowToast(true);

        return;
      }

      const payload: ProjectPayload = {
        action: 'add',
        projectId: id,
        projectCustomName: nameInputRef.current.value,
      };

      setShowModal(false);

      electron.ipcRenderer.send(RendererToMainChannels.Project, payload);
    } else {
      throw new Error('No elements!');
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <ShowToast show={showToast} setShow={setShowToast} />
      <Modal.Header closeButton>
        <Modal.Title>Add project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Project ID</Form.Label>
            <Form.Control type="text" placeholder="00000000" autoFocus ref={idInputRef} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Project name</Form.Label>
            <Form.Control type="text" placeholder="My Project" ref={nameInputRef} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
