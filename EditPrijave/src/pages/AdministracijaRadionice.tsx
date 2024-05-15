import axios from "axios";
import { useEffect, useState } from "react";
import ApplicationForm from '../components/ApplicationForm.tsx'
import AdminBar from "../components/AdminBar.tsx";
function AdministracijaRadionice(){
    const [dataArray, setDataArray] = useState<any[]>([]);

    useEffect(() => {
        fetchDataWithFilters();
    }, []);

    const fetchDataWithFilters = () => {
        axios.get(`http://localhost:3001/radionice`)
          .then(response => {
            setDataArray(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      };

      const [formVisible, setFormVisible] = useState(false);

      const handleOpenForm = () => {
        setFormVisible(true);
      };

      const handleCloseForm = () => {
        setFormVisible(false);
      };
        
        return(<>
            <AdminBar></AdminBar>
            <div>
            {dataArray.map((item, index) => (
                <div key={index}>
                    <h2>{item.ime}</h2>
                    <p>{item.broj_prijava}</p>
                    <p>{item.datum}</p>
                    <button onClick={handleOpenForm}>Uredi</button>
                    {formVisible && <ApplicationForm onCloseForm={handleCloseForm} />}
                    <button>Izbrisi</button>
                </div>
            ))}
        </div>
        </>)
}

export default AdministracijaRadionice;