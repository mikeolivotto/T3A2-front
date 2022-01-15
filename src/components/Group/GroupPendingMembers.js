import ListGroup from "react-bootstrap/ListGroup";
import { capitalise } from "../../utils/helperFunctions";

function GroupPendingMembers(props) {

  console.log(props.members)
  const membersArray = props.members


  const membersList = membersArray.map((member) => {
    return (
      <ListGroup.Item key={member._id}>{capitalise(member)}
      </ListGroup.Item>
    );
  });

  const members = () => {
    if (membersArray.length >= 1) {
      return <ListGroup>{membersList}</ListGroup>;
    } else {
      return <p>No members have accepted invites</p>;
    }
  };

  return <div>{members()}</div>;
}

export default GroupPendingMembers;
