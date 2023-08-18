import React, { useState } from 'react';
import ModalWindow from './ModalWindow';

interface ReportingFormProps {
  onSubmit: (reportData: ReportData) => void;
  onCancel: () => void;
}

interface ReportData {
  reason: string;
  details: string;
  screenshot: File | null;
}

const ReportingForm: React.FC<ReportingFormProps> = ({ onSubmit, onCancel }) => {
  const [reportData, setReportData] = useState<ReportData>({
    reason: '',
    details: '',
    screenshot: null,
  });

  const handleReasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setReportData({ ...reportData, reason: event.target.value });
  };

  const handleDetailsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReportData({ ...reportData, details: event.target.value });
  };

  const handleScreenshotChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setReportData({ ...reportData, screenshot: event.target.files[0] });
    }
  };

  const handleSubmit = () => {
    // Send report logic here
    onSubmit(reportData);
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
        <input type="text" value={reportData.details} onChange={handleDetailsChange} />
      </label>
      <br />
      <label>
        Screenshot/Image:
        <input type="file" accept="image/*" onChange={handleScreenshotChange} />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};
