import React, { useState } from 'react';
import { styled } from '@mui/material/styles';

const FormContainer = styled('div')({
  maxWidth: '400px',
  margin: '0 auto',
});

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    console.log(formData);
  };

  return (
    <FormContainer>
      <h2>Contact Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </FormContainer>
  );
};

export default ContactForm;
