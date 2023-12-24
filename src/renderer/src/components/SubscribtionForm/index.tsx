import { Button, Form, InputGroup } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import { handleSubscribe } from './handleSubscribe';
import { ProjectContext } from '../context/ProjectContext';

export function SubscriptionForm() {
  const [inputValue, setInputValue] = useState('');
  const id = useContext(ProjectContext);
  const handleSubscribeCallback = handleSubscribe.bind(null, id, inputValue, setInputValue);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubscribeCallback();
    }
  };

  return (
    <InputGroup className="mb-4">
      <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
      <Form.Control
        placeholder="Pipeline ID"
        aria-label="Username"
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyPress}
        value={inputValue}
      />
      <Button variant="outline-secondary" id="button-addon1" onClick={handleSubscribeCallback}>
        Subscribe
      </Button>
    </InputGroup>
  );
}
