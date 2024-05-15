import axios from "axios";
import { useEffect, useState } from "react";
import ApplicationForm from "../components/ApplicationForm";
import AdminBar from "../components/AdminBar";

function AdministracijaPredavaci(){

    const [dataArray, setDataArray] = useState<any[]>([]);

    const fetchDataWithFilters = () => {
        axios.get(`http://localhost:3001/predavaci`)
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
                    <p>{item.biografija}</p>
                    <p>{item.organizacija}</p>
                    <p>{item.teme}</p>
                    {formVisible && <ApplicationForm onCloseForm={handleCloseForm} />}
                    <button>Uredi</button>
                </div>
            ))}
        </div>
    </>)
}

export default AdministracijaPredavaci;