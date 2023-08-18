import React, { useState } from 'react';
import ModalWindow from './ModalWindow';

interface AppealFormProps {
  onSubmit: (appealData: AppealData) => void;
  onCancel: () => void;
}

interface AppealData {
  reason: string;
  details: string;
  screenshot: File | null;
  appealReason: string; // New field for the appeal reason
}

const AppealForm: React.FC<AppealFormProps> = ({ onSubmit, onCancel }) => {
  const [appealData, setAppealData] = useState<AppealData>({
    reason: '',
    details: '',
    screenshot: null,
    appealReason: '', // Initialize the appeal reason
  });

  const handleAppealReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAppealData({ ...appealData, appealReason: event.target.value });
  };

  const handleDetailsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetails(event.target.value);
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
        <input type="text" value={appealData.appealReason} onChange={handleAppealReasonChange} />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default AppealForm;
