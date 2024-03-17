import { useState } from 'react';
import { ProjectModal } from './ProjectModal';

export function Title() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h1>Projects</h1>
      <span
        className="add-button"
        onClick={() => {
          setShowModal(true);
        }}
      >
        + Add
      </span>
      {showModal && <ProjectModal showModal={showModal} setShowModal={setShowModal} />}
    </div>
  );
}
