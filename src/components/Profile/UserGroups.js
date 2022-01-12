import { useGlobalState } from "../../config/store";
import ListGroup from 'react-bootstrap/ListGroup';

function UserGroups() {

  const { store } = useGlobalState()

   const groupArray = store.profileData[2].concat(store.profileData[3])


  const groupsList = groupArray.map((group) => {
    return <ListGroup.Item key={ group._id }>{ group.groupName }</ListGroup.Item>
  })


  const groups = () => {
    if(groupArray.length >= 1) {
      return <ListGroup className="col-8 col-md-5 col-lg-3 mx-auto">{ groupsList }</ListGroup>
    } else {
      return <p>You have not joined any groups, amigo</p>
    }
  }

    return (
      <div style={{color: "blue", maxHeight: "20vh", overflowY: "scroll"}}>
      { groups() }
      </div>
    );
  }
  
  export default UserGroups;
  