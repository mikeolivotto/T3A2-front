import ListGroup from "react-bootstrap/ListGroup";

function GroupMembers(props) {

  console.log(props.members)
  const membersArray = props.members


  const membersList = membersArray.map((member) => {
    return (
      <ListGroup.Item key={member._id}>{member}
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

export default GroupMembers;
