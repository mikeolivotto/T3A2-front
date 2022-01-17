import { useGlobalState } from "../../config/store";
import ListGroup from "react-bootstrap/ListGroup";
// import { Link } from "react-router-dom";
import { capitalise } from "../../utils/helperFunctions";
import Button from "react-bootstrap/Button";
import { updateSpecificGroup } from "../../services/apiCRUD/groupCRUD";
// import { Stack } from "react-bootstrap";

function UserInvites() {
  const { store } = useGlobalState();

  const groupArray = store.profileData[4];
  const username = store.profileData[0].username;
  const idToken = store.idToken;

  const handleClick = (event) => {
    const groupId = event.target.value;
    const action = event.target.name;

    updateSpecificGroup(groupId, idToken, username, action);
  };

  // const groupsList = groupArray.map((group) => {
  //   return;
  //   <ListGroup.Item key={group._id}>
  //     {/* <Stack direction="horizontal" gap={3} className="flex-wrap"> */}
  //     {capitalise(group.groupName)}
  //     {/* <div className="ms-auto"> */}
  //     <Button
  //       variant="success"
  //       size="sm"
  //       name="accept"
  //       value={group._id}
  //       onClick={handleClick}
  //     >
  //       Accept
  //     </Button>{" "}
  //     {/* </div> */}
  //     {/* <div> */}
  //     <Button
  //       variant="danger"
  //       size="sm"
  //       name="reject"
  //       value={group._id}
  //       onClick={handleClick}
  //     >
  //       Reject
  //     </Button>
  //     {/* </div> */}
  //     {/* </Stack> */}
  //   </ListGroup.Item>
  // });

  const groups = () => {
    if (groupArray.length >= 1) {
      return <ListGroup>{groupsList}</ListGroup>;
    } else {
      return <p>You have not joined any groups, amigo</p>;
    }
  };

  return <>{groups()}</>;
}

export default UserInvites;
