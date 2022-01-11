import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ListGroup from 'react-bootstrap/ListGroup'

function UserProfile() {
  return (
    <> 
      <img src="./img/avatar.png" alt="user avatar"></img>
      {/* Need to dynamically render username and all details */}
      <h2>[Username]</h2>

      <h3>Groups you belong to:</h3>
      <ListGroup className="col-8 col-md-5 col-lg-3 mx-auto">
        <ListGroup.Item><Link to="/group/jkhgfioeghkjbnf">Example Group 1</Link></ListGroup.Item>
        <ListGroup.Item><Link to="/group/5ywyuihsf784g">Example Group 2</Link></ListGroup.Item>
      </ListGroup>


      <h3>Pending Group Invites:</h3>

      <h3>Games played:</h3>

      <h3>[Username]'s scoreboard</h3>
      <Button>View stats</Button>
    </>
  );
}

export default UserProfile;
