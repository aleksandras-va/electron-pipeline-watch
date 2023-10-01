import { Button, Form, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import { handleSubscribe } from './handleSubscribe';

import cx from 'classnames';

interface Props {
  id: number;
}

export function SubscribeInput({ id }: Props) {
  // const PROJECT_ID_CHANNEL = `project:id-${id}`;

  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // const handleFromMain = () => setInputValue(inputValue + 1);
  //
  // useEffect(() => {
  //   electron?.ipcRenderer.on(PROJECT_ID_CHANNEL, handleFromMain);
  //
  //   return () => electron.ipcRenderer.removeAllListeners(PROJECT_ID_CHANNEL);
  // }, [inputValue]);

  return (
    <InputGroup className="mb-4">
      <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
      <Form.Control
        className={cx(errorMessage && 'bg-danger')}
        placeholder={errorMessage ? errorMessage : 'Pipeline ID'}
        aria-label="Username"
        onChange={(event) => setInputValue(event.target.value)}
        value={inputValue}
      />
      <Button
        variant="outline-secondary"
        id="button-addon1"
        onClick={() => handleSubscribe(id, inputValue, setInputValue, setErrorMessage)}
      >
        Subscribe
      </Button>
    </InputGroup>
  );
}
