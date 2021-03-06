import { useSearchContext } from "../hooks/useSearch";

import './Modal.css';

function Modal() {
  const { showMore, setShowMore, pictures } = useSearchContext();
  const modalClass = `modal${showMore === ''
    ? ' hide'
    : ''}`;
  const selectedPicture = pictures.filter(pic => pic.date === showMore)[0];

  if (selectedPicture === undefined) {
    return null;
  }

  return (
    <div className={modalClass} onClick={() => setShowMore('')}>
      <div className="modal-content">
        <img alt={selectedPicture.title} src={selectedPicture.url} />
        <p>
          <strong>{selectedPicture.title}: </strong>
          {selectedPicture.explanation}
        </p>
      </div>
    </div>
  );
}

export default Modal
