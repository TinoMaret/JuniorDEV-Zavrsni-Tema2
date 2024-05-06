import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface Props {
  onCloseForm: () => void;
}

const FormComponent: React.FC<Props> = ({ onCloseForm }) => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you can implement the logic to submit the form data
    // For demonstration, let's just log the data
    console.log(formData);
    // Clear form fields
    setFormData({ name: '', email: '', message: '' });
    // Set submitted to true
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseForm = () => {
    setSubmitted(false);
    onCloseForm();
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  };

  const renderThankYouMessage = () => {
    return <div>Thank you for your submission!</div>;
  };

  return (
    <div>
      {renderForm()}
      {submitted && renderThankYouMessage()}
      <button onClick={handleCloseForm}>Close Form</button>
    </div>
  );
};

export default FormComponent;
