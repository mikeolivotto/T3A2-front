import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'


function UserProfile() {
    return (
      <>
      <p>'User profile' component</p>
      <img src="./img/avatar.png" alt="user avatar"></img>
      {/* Need to dynamically render username and all details */}
      <h2>[Username]</h2>

      <h3>Groups you belong to:</h3>
      <ul><li><Link to="/group">Example Group</Link></li></ul>

      <h3>Pending Group Invites:</h3>

      <h3>Games played:</h3>

      <h3>[Username]'s scoreboard</h3>
      <Button>View stats</Button>
      </>
    );
  }
  
  export default UserProfile;
  