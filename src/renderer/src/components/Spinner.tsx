import { Spinner as SpinnerBase } from 'react-bootstrap/';

export function Spinner() {
  return (
    <div className="spinner-wrapper">
      <div className="spinner">
        <SpinnerBase animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </SpinnerBase>
      </div>
    </div>
  );
}
