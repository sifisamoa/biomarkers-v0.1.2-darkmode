import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');

const ModalPortal = ({ children }) => {
  useEffect(() => {
    document.body.appendChild(modalRoot);
    return () => {
      document.body.removeChild(modalRoot);
    };
  }, []);

  return createPortal(children, modalRoot);
};

export default ModalPortal;
