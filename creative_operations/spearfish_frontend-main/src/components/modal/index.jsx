import './modal.scss';
import { useRef, useEffect } from 'react';

const Modal = ({ children, className, style, isOpen, closeModal }) => {
  const modalContainerRef = useRef(null);

  const hideModal = () => {
    const modalContainer = modalContainerRef.current;
    modalContainer.classList.add('hide-container');
  }

  const showModal = () => {
    const modalContainer = modalContainerRef.current;
    modalContainer.classList.remove('hide-container');
  }

  useEffect(() => {
    (isOpen ? showModal : hideModal)();
  }, [isOpen]);

  return (
    <div className="modal-container flex-column-center align-center hide-container" ref={modalContainerRef}>
      <div className="overlay" onClick={closeModal}></div>
      <div className={`modal-content ${className}`} style={{ style }}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
