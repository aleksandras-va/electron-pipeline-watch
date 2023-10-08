import { Button, Form, InputGroup } from 'react-bootstrap';
import React, { useState } from 'react';
import { handleSubscribe } from './handleSubscribe';

import cx from 'classnames';

interface Props {
  id: number;
}

export function SubscribeInput({ id }: Props) {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribeCallback = handleSubscribe.bind(
    null,
    id,
    inputValue,
    setInputValue,
    setErrorMessage
  );

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubscribeCallback();
    }
  };

  return (
    <InputGroup className="mb-4">
      <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
      <Form.Control
        className={cx(errorMessage && 'bg-danger')}
        placeholder={errorMessage ? errorMessage : 'Pipeline ID'}
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
