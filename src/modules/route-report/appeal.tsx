import React, { useState } from 'react';
import ModalWindow from './ModalWindow';

interface AppealFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

const AppealForm: React.FC<AppealFormProps> = ({ onSubmit, onCancel }) => {
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');

  const handleReasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setReason(event.target.value);
  };

  const handleDetailsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetails(event.target.value);
  };

  const handleSubmit = () => {
    // Send appeal logic here
    onSubmit();
  };

  return (
    <div className="appeal-form">
      <h2>Appeal Punishment</h2>
      <label>
        Appeal Reason:
        <select value={reason} onChange={handleReasonChange}>
          <option value="">Select a reason</option>
          <option value="false-ban">False ban</option>
          <option value="misunderstanding">Misunderstanding</option>
          <option value="punishment-disproportionate">Punishment disproportionate</option>
          <option value="appeal-other">Other (please specify in the text field)</option>
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

export default AppealForm;
