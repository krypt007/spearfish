import './confirm_modal.scss';
import React from 'react';
import { Icon } from '@iconify/react';
import CustomButton from '../Button';

const Modal = React.lazy(() => (import('../modal')));

const ConfirmModal = ({ children, isOpen, closeModal, performOperation, isProcessing }) => {
  return (
    <Modal className='confirm-modal-container' isOpen={isOpen} closeModal={closeModal}>
      <div className='flex-column-center align-center'>
        <div className="icon flex-column-center align-center m-tb-10 mb-20">
          <Icon icon='ant-design:alert-twotone' />
        </div>
        <div className="details mb-30 fs-0-9">
          {children}
        </div>
      </div>
      <div className='flex-row space-between align-center buttons'>
        <button className='button' onClick={closeModal}>Cancel</button>
        <CustomButton classes='button' onClick={performOperation} loading={isProcessing}>Confirm</CustomButton>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
