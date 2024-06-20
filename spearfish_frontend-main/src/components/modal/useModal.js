import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [resource, setResource] = useState(null);

  const closeModal = () => {
    setIsOpen(false);
    setResource(null);
  }

  const openModal = () => {
    setIsOpen(true);
  }

  return { isOpen, closeModal, openModal, resource, setResource };
}

export default useModal;
