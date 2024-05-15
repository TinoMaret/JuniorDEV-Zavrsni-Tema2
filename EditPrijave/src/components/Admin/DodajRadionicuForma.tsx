import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  onSubmit: () => void; // Callback function to be called on form submission
}

interface ObjectData {
  ime: string;
  datum: string;
  predavac: string;
  opis: string;
  tezina: string;
  tema: string;
}

const AddObjectForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ObjectData>({
    ime: '',
    datum: '',
    predavac: '',
    opis: '',
    tezina: '',
    tema: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Send POST request to add the object
    axios.post('http://localhost:3001/radionice', formData)
      .then(response => {
        console.log('Object added successfully:', response.data);
        onSubmit(); // Call the callback function provided by the parent component
      })
      .catch(error => {
        console.error('Error adding object:', error);
        // Handle error, show error message, etc.
      });
  };

  return (
    <div>
      <h1>Add Object Form</h1>
      <form onSubmit={handleSubmit}>
      <label htmlFor="ime">Ime:</label>
        <input type="text" id="ime" name="ime" onChange={handleChange} /><br /><br />

        <label htmlFor="datum">Datum:</label>
        <input type="text" id="datum" name="datum" onChange={handleChange} /><br /><br />

        <label htmlFor="predavac">Predavac:</label>
        <input type="text" id="predavac" name="predavac" onChange={handleChange} /><br /><br />

        <label htmlFor="opis">Opis:</label>
        <textarea id="opis" name="opis" onChange={handleChange}></textarea><br /><br />

        <label htmlFor="tezina">Tezina:</label>
        <input type="text" id="tezina" name="tezina" onChange={handleChange} /><br /><br />

        <label htmlFor="tema">Tema:</label>
        <input type="text" id="tema" name="tema" onChange={handleChange} /><br /><br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddObjectForm;
