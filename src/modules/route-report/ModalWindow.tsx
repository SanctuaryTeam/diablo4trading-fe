import React from 'react';

interface ModalWindowProps {
  open: boolean;
  onClose: () => void;
}

const ModalWindow: React.FC<ModalWindowProps> = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        {children}
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalWindow;
