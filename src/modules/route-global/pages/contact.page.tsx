import React from 'react';
import { styled } from '@mui/material/styles';

const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '400px',
  margin: '0 auto',
});

const FormInput = styled('input')({
  marginBottom: '16px',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  outline: 'none',
});

const FormTextArea = styled('textarea')({
  marginBottom: '16px',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  outline: 'none',
});

const SubmitButton = styled('button')({
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  padding: '10px 20px',
  cursor: 'pointer',
});

interface ContactFormProps {
  onSubmit: (event: React.FormEvent) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  return (
    <FormContainer>
      <h2>Contact Us</h2>
      <form onSubmit={onSubmit}>
        <FormInput type="text" placeholder="Your Name" required />
        <FormInput type="email" placeholder="Your Email" required />
        <FormTextArea rows={4} placeholder="Your Message" required />
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </FormContainer>
  );
};

const ContactPage: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  const markdownContent = `
## Contact Us

Please fill out the form below to get in touch with us:
`;

  return (
    <div>
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
      <ContactForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ContactPage;
