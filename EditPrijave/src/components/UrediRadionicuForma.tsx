import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ObjectData {
  ime: string;
  datum: string;
  predavac: string;
  opis: string;
  tezina: string;
  tema: string;
}

interface Props {
    id: string;
    onSubmit: () => void; // Callback function to be called on form submission
  }

const EditObjectForm: React.FC<Props> = ({ id, onSubmit }) => {
  const [formData, setFormData] = useState<ObjectData>({
    ime: '',
    datum: '',
    predavac: '',
    opis: '',
    tezina: '',
    tema: ''
  });

  useEffect(() => {
    // Fetch existing object data when component mounts
    fetchObjectData();
  }, []);

  const fetchObjectData = () => {
    // Fetch object data based on the provided id
    axios.get<ObjectData>(`http://localhost:3001/radionice/${id}`)
      .then(response => {
        const data = response.data;
        setFormData(data);
      })
      .catch(error => {
        console.error('Error fetching object data:', error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Send PATCH request to update object data
    axios.patch(`http://localhost:3001/radionice/${id}`, formData)
      .then(response => {
        console.log('Object updated successfully:', response.data);
        // Redirect to success page or perform other actions as needed
        onSubmit()
      })
      .catch(error => {
        console.error('Error updating object:', error);
        // Handle error, show error message, etc.
      });
  };

  return (
    <div>
      <h1>Edit Object Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="ime">Ime:</label>
        <input type="text" id="ime" name="ime" value={formData.ime} onChange={handleChange} /><br /><br />

        <label htmlFor="datum">Datum:</label>
        <input type="text" id="datum" name="datum" value={formData.datum} onChange={handleChange} /><br /><br />

        <label htmlFor="predavac">Predavac:</label>
        <input type="text" id="predavac" name="predavac" value={formData.predavac} onChange={handleChange} /><br /><br />

        <label htmlFor="opis">Opis:</label>
        <textarea id="opis" name="opis" value={formData.opis} onChange={handleChange}></textarea><br /><br />

        <label htmlFor="tezina">Tezina:</label>
        <input type="text" id="tezina" name="tezina" value={formData.tezina} onChange={handleChange} /><br /><br />

        <label htmlFor="tema">Tema:</label>
        <input type="text" id="tema" name="tema" value={formData.tema} onChange={handleChange} /><br /><br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default EditObjectForm;
