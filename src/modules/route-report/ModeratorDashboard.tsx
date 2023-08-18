import React, { useState } from 'react';
import ModalWindow from './ModalWindow';
import ReportingForm from './ReportingForm';
import Snackbar from './Snackbar';

interface ModerationAction {
  id: number;
  type: 'warn' | 'ban';
  user: string;
}

const ModeratorDashboard: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const [moderationAction, setModerationAction] = useState<ModerationAction | null>(null);

  const reports = [
    { id: 1, reason: 'spam', details: 'Spam content on post', user: 'user123' },
    { id: 2, reason: 'inappropriate', details: 'Inappropriate language', user: 'user456' },
    // ... other reports
  ];

  const handleReportClick = (reportId: number) => {
    setSelectedReport(reportId);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedReport(null);
    setModalOpen(false);
  };

  const handleReportSubmit = () => {
    // Send report logic here
    setSnackbarOpen(true);
    setModalOpen(false);
  };

  const handleActionClick = (actionType: 'warn' | 'ban', userId: string) => {
    setModerationAction({ id: selectedReport, type: actionType, user: userId });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="moderator-dashboard">
      <h1>Moderator Dashboard</h1>
      <div className="report-queue">
        <h2>Report Queue</h2>
        <ul>
          {reports.map(report => (
            <li key={report.id}>
              <span>{report.user}</span>
              <button onClick={() => handleReportClick(report.id)}>View Report</button>
            </li>
          ))}
        </ul>
      </div>
      <ModalWindow open={modalOpen} onClose={handleModalClose}>
        <ReportingForm onSubmit={handleReportSubmit} onCancel={handleModalClose} />
      </ModalWindow>
      <Snackbar open={snackbarOpen} onClose={handleSnackbarClose} />

      {moderationAction && (
        <div className="moderation-action">
          <h2>Take Action</h2>
          <p>
            <strong>Report ID:</strong> {moderationAction.id}
            <br />
            <strong>User:</strong> {moderationAction.user}
          </p>
          <button onClick={() => handleActionClick('warn', moderationAction.user)}>Warn User</button>
          <button onClick={() => handleActionClick('ban', moderationAction.user)}>Ban User</button>
        </div>
      )}
    </div>
  );
};

export default ModeratorDashboard;
