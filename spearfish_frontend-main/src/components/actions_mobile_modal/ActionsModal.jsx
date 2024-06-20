import Modal from '../modal';
import './actions_modal.scss';

const ActionsModal = ({ children, isOpen, closeModal }) => {
  return (
    <Modal className='actions-modal-container' isOpen={isOpen} closeModal={closeModal}>
      <div className='actions-container'>
        {children}
      </div>
    </Modal>
  );
};

export default ActionsModal;
