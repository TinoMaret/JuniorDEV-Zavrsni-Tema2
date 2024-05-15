import { Link } from "react-router-dom";
function AdminBar(){

    return(<>
    <nav>
        <ul>
          <li><Link to={"/Administracija/Radionice"}>Radionice</Link></li>
          <li><Link to={"/Administracija/Organizacije"}>Organizacije</Link></li>
          <li><Link to={"/Administracija/Predavaci"}>Predavaci</Link></li>
          <li><button>Dodaj</button></li>
        </ul>
      </nav>
    </>)
}

export default AdminBar;