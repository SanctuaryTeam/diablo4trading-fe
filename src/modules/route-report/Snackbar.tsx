import React from 'react';

interface SnackbarProps {
  open: boolean;
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="snackbar">
      Report sent successfully.
      <button className="snackbar-close" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default Snackbar;
