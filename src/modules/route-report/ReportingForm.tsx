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
        Report Reason:
        <select value={reason} onChange={handleReasonChange}>
          <option value="">Select a reason</option>
          <option value="bids-not-honored">Bids not honored</option>
          <option value="alt-manipulation">Alt/friend used for manipulation</option>
          <option value="scam">Scam (withholding gold/services)</option>
          <option value="exploit-sales">Exploit sales (bugged sigils, etc)</option>
          <option value="rmt">RMT (Real Money Trading)</option>
          <option value="sales-outside">Sales outside of application (Direct Messages/etc)</option>
          <option value="editing-bids">Editing bids after posting</option>
          <option value="other">Other (which could be detailed in the text field)</option>
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
