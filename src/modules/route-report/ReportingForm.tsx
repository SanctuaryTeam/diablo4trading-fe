import React, { useState } from 'react';
import ModalWindow from './ModalWindow';

interface ReportingFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

const ReportingForm: React.FC<ReportingFormProps> = ({ onSubmit, onCancel }) => {
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');

  const handleReasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setReason(event.target.value);
  };

  const handleDetailsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetails(event.target.value);
  };

  const handleSubmit = () => {
    // Send report logic here
    onSubmit();
  };

  return (
    <div className="reporting-form">
      <h2>Report Issue</h2>
      <label>
        Reason:
        <select value={reason} onChange={handleReasonChange}>
          <option value="">Select a reason</option>
          <option value="spam">Spam</option>
          <option value="inappropriate">Inappropriate content</option>
          <option value="other">Other</option>
        </select>
      </label>
      <br />
      <label>
        Details:
        <input type="text" value={details} onChange={handleDetailsChange} />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default ReportingForm;
