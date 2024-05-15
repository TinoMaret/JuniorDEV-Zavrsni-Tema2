import axios from "axios";
import { useEffect, useState } from "react";
import ApplicationForm from "../components/ApplicationForm";
import AdminBar from "../components/AdminBar";

function AdministracijaOrganizacije(){

    const [dataArray, setDataArray] = useState<any[]>([]);

    const fetchDataWithFilters = () => {
        axios.get(`http://localhost:3001/organizacije`)
          .then(response => {
            setDataArray(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      };

      useEffect(() => {
        fetchDataWithFilters();
    }, []);

      const [formVisible, setFormVisible] = useState(false);


      const handleCloseForm = () => {
        setFormVisible(false);
      };

    return(<>
        <AdminBar></AdminBar>
        <div>
            {dataArray.map((item, index) => (
                <div key={index}>
                    <h2>{item.ime}</h2>
                    <p>{item.opis}</p>
                    {formVisible && <ApplicationForm onCloseForm={handleCloseForm} />}
                    <button>Uredi</button>
                </div>
            ))}
        </div>
    </>)
}

export default AdministracijaOrganizacije;