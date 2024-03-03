import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useRef } from 'react';
import { RendererToMainChannels } from '../../globalConstants';
import { UserPayload } from '../../globalTypes';

export function Login() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const apiKeyRef = useRef<HTMLInputElement | null>(null);
  const updateFrequencyRef = useRef<HTMLSelectElement | null>(null);

  const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (usernameRef?.current?.value && apiKeyRef?.current?.value) {
      const payload: UserPayload = {
        action: 'login',
        username: usernameRef.current.value,
        apiKey: apiKeyRef.current.value,
        frequency: updateFrequencyRef!.current!.value,
      };

      electron.ipcRenderer.send(RendererToMainChannels.User, payload);
    }
  };

  return (
    <main className="mx-auto login-container">
      <div>
        <h1 className="mt-5 mb-3 text-center">Welcome</h1>
        <p className="text-center mb-5">Configuration file not found. Please login.</p>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>GitLab Username</Form.Label>
            <Form.Control type="email" placeholder="john_doe" ref={usernameRef} />
            <Form.Text className="text-muted">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              You can find it in your profile page, do not include the "@".
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>API Key</Form.Label>
            <Form.Control type="password" placeholder="4p!+k3y" ref={apiKeyRef} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Update Frequency</Form.Label>
            <Form.Select ref={updateFrequencyRef}>
              <option value="10_000">10 seconds (for debugging)</option>
              <option value="60_000">1 minute</option>
              <option value="300_000">5 minutes</option>
              <option value="600_000">10 minutes</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Login
          </Button>
        </Form>
      </div>
    </main>
  );
}
