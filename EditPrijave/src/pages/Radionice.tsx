import axios from "axios";
import { useEffect, useState } from "react";
import { AdminContext } from "../components/Admin/AdminContext";
import ApplicationForm from '../components/ApplicationForm.tsx'

function Radionice() {
    const [dataArray, setDataArray] = useState<any[]>([]);
    const [themes, setThemes] = useState<any[]>([]);
    const [level, setLevel] = useState<any[]>([]);
    const { checked } = AdminContext();

    
    /*
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/radionice');
                setDataArray(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        */
    const fetchThemes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/teme');
            setThemes(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchLevel = async () => {
        try {
            const response = await axios.get('http://localhost:3001/tezine');
            setLevel(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [attribute1Filters, setAttribute1Filters] = useState<string[]>([]);
    const [attribute2Filters, setAttribute2Filters] = useState<string[]>([]);

    // Function to handle checkbox change for attribute 1
    const handleAttribute1CheckboxChange = (value: string) => {
        setAttribute1Filters(prevFilters => {
            if (prevFilters.includes(value)) {
                return prevFilters.filter(filter => filter !== value); // Remove the filter if already selected
            } else {
                return [...prevFilters, value]; // Add the filter if not already selected
            }
        });
    };

    // Function to handle checkbox change for attribute 2
    const handleAttribute2CheckboxChange = (value: string) => {
        setAttribute2Filters(prevFilters => {
            if (prevFilters.includes(value)) {
                return prevFilters.filter(filter => filter !== value); // Remove the filter if already selected
            } else {
                return [...prevFilters, value]; // Add the filter if not already selected
            }
        });
    };

    useEffect(() => {
        fetchDataWithFilters();
        fetchThemes();
        fetchLevel();
    }, [attribute1Filters, attribute2Filters]);


    // Function to make the GET request with filters
    const fetchDataWithFilters = () => {
        const queryParams = new URLSearchParams();
    
        // Add attribute 1 filters to query parameters
        attribute1Filters.forEach(filter => {
          queryParams.append('tezina', filter);
        });
    
        // Add attribute 2 filters to query parameters
        attribute2Filters.forEach(filter => {
          queryParams.append('tema', filter);
        });

    
        // Make the GET request with axios
        axios.get(`http://localhost:3001/radionice?${queryParams.toString()}`)
          .then(response => {
            // Handle response data
            setDataArray(response.data);
          })
          .catch(error => {
            // Handle error
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

    // Example of rendering checkboxes for attribute 1
    const renderAttribute1Checkboxes = () => {
        return (
            <div>
                <div>
                    <h3>Tezina</h3>
                    {level.map((item, index) => (
                        <div key={index}>
                            <label>
                                <input type="checkbox"
                                value={item.ime}
                                checked={attribute1Filters.includes(item.ime)}
                                onChange={() => handleAttribute1CheckboxChange(item.ime)}>
                                </input>
                                {item.ime}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Example of rendering checkboxes for attribute 2
    const renderAttribute2Checkboxes = () => {
        return (
            <div>
                <div>
                    <h3>Teme</h3>
                    {themes.map((item, index) => (
                        <div key={index}>
                            <label>
                                <input type="checkbox"
                                value={item.ime}
                                checked={attribute2Filters.includes(item.ime)}
                                onChange={() => handleAttribute2CheckboxChange(item.ime)}>
                                </input>
                                {item.ime}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        );
    };


    return (<>
        {checked ? <button>Dodaj novu radionicu</button> : <></>}
        <div>
            {/* Render attribute 1 checkboxes */}
            {renderAttribute1Checkboxes()}

            {/* Render attribute 2 checkboxes */}
            {renderAttribute2Checkboxes()}

            {/* Button to trigger fetching data with filters */}
        </div>

        <div>
            {dataArray.map((item, index) => (
                <div key={index}>
                    <h2>{item.ime}</h2>
                    <p>{item.opis}</p>
                    <p>{item.predavac}</p>
                    <p>{item.datum}</p>
                    <button onClick={handleOpenForm}>Prijavi se</button>
                    {formVisible && <ApplicationForm onCloseForm={handleCloseForm} />}
                    {checked ? <button>Uredi</button> : <></>}
                </div>
            ))}
        </div>
    </>);
}

export default Radionice;