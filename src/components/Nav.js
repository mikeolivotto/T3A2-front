import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGlobalState } from "../config/store";

function Nav() {
  const {store,dispatch} = useGlobalState()
  const handleLogOut = (event) => {
    event.preventDefault()
    dispatch({type: "removeProfile"})
  }
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
      {
        (store.idToken) ? <Button onClick={handleLogOut}>Log Out</Button> : null
      }
      
    </nav>
  );
}

export default Nav;
