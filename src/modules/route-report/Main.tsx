import React, { useState } from 'react';
import ModalWindow from './ModalWindow';
import ReportingForm from './ReportingForm';
import Snackbar from './Snackbar';

const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleReportClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleReportSubmit = () => {
    // Send report logic here
    setSnackbarOpen(true);
    setModalOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="app">
      <button onClick={handleReportClick}>Report</button>
      <ModalWindow open={modalOpen} onClose={handleModalClose}>
        <ReportingForm onSubmit={handleReportSubmit} onCancel={handleModalClose} />
      </ModalWindow>
      <Snackbar open={snackbarOpen} onClose={handleSnackbarClose} />
    </div>
  );
};

export default App;