import { Button } from 'react-bootstrap';
import { UserPayload } from '../../../globalTypes';
import { RendererToMainChannels } from '../../../globalConstants';

interface Props {
  username: string;
}
export function User({ username }: Props) {
  const handleLogout = () => {
    const payload: UserPayload = {
      action: 'logout',
    };

    electron.ipcRenderer.send(RendererToMainChannels.User, payload);
  };

  return (
    <div style={{ textAlign: 'right' }}>
      <span className="d-inline-block pb-2">Hello, {username}</span>
      <br />
      <Button className="pl-4" variant="outline-secondary" size="sm" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
