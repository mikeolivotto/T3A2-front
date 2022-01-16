import ListGroup from "react-bootstrap/ListGroup";
import { capitalise } from "../../utils/helperFunctions";

function GroupMembers(props) {

  console.log(props.members)
  const membersArray = props.members


  const membersList = membersArray.map((member, index) => {
    return (
      <ListGroup.Item key={index}>{capitalise(member)}
      </ListGroup.Item>
    );
  });

  const members = () => {
    if (membersArray.length >= 1) {
      return <ListGroup className="col-8 col-md-5 col-lg-3 mx-auto">{membersList}</ListGroup>;
    } else {
      return <p>No members have accepted invites</p>;
    }
  };

  return <div>{members()}</div>;
}

export default GroupMembers;
