import { useGlobalState } from "../../config/store";
import ListGroup from 'react-bootstrap/ListGroup';
// import { Link } from "react-router-dom";
import { capitalise } from "../../utils/helperFunctions";
import Button from "react-bootstrap/Button";
import { updateSpecificGroup } from "../../services/apiCRUD/groupCRUD";


function UserInvites() {

  const { store } = useGlobalState()

  const groupArray = store.profileData[4]
  const username = store.profileData[0].username
  const idToken = store.idToken

  const handleClick = (event) => {
    const groupId = event.target.value
    const action = event.target.name

    updateSpecificGroup(groupId, idToken, username, action)

  }


  const groupsList = groupArray.map((group) => {
    return <ListGroup.Item key={group._id}>
               {capitalise(group.groupName)} <Button size="sm" name="accept" value={group._id} onClick={handleClick} >Accept</Button> <Button variant="secondary" size="sm" name="reject" value={group._id} onClick={handleClick}>
      Reject
    </Button>
      </ListGroup.Item>
  })


  const groups = () => {
    if(groupArray.length >= 1) {
      return <ListGroup>{groupsList}</ListGroup>
    } else {
      return <p>You have not joined any groups, amigo</p>
    }
  }

    return (
      <>
      { groups() }
      </>
    );
  }
  
  export default UserInvites;
  