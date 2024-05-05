import { Link } from "react-router-dom";
import { AdminContext} from "./Admin/AdminContext.tsx";
function NavBar(){

    const { checked } = AdminContext();
    return(<>
    <nav>
        <ul>
          <li><Link to={"/"}>Home</Link></li>
          <li><Link to={"/Radionice"}>Radionice</Link></li>
          <li><Link to={"/Predavaci"}>Predavaci</Link></li>
          {checked ? <li><Link to={"/Administracija"}>Administracija</Link></li> : <li><Link to={"/Predavaci"}>Administracija</Link></li>}
        </ul>
      </nav>
    </>)
}

export default NavBar;