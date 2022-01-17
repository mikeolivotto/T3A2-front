import { useGlobalState } from "../../config/store";
import ListGroup from "react-bootstrap/ListGroup";
// import { Link } from "react-router-dom";
import { capitalise } from "../../utils/helperFunctions";
import Button from "react-bootstrap/Button";
import { updateSpecificGroup } from "../../services/apiCRUD/groupCRUD";
import { getSpecificProfile } from "../../services/apiCRUD/profileCRUD";
import Stack from "react-bootstrap/Stack";

function UserInvites() {
  const { store, dispatch } = useGlobalState();

  const groupArray = store.profileData[4];
  const username = store.profileData[0].username;
  const idToken = store.idToken;

  const handleClick = async (event) => {
    const groupId = event.target.value;
    const action = event.target.name;

    const profileId = store.profileData[0]._id;

    updateSpecificGroup(groupId, idToken, username, action).then((res) => {
      getSpecificProfile(profileId, store.idToken).then((res) =>
        dispatch({
          type: "setProfile",
          data: res.data,
        })
      );
    });
  };

  const groupsList = groupArray.map((group, index) => {
    return (
      <ListGroup.Item key={index}>
        <Stack direction="horizontal" gap={3} className="flex-wrap">
          {capitalise(group.groupName)}{" "}
          <div className="ms-auto">
            <Button
              variant="success"
              size="sm"
              name="accept"
              value={group._id}
              onClick={handleClick}
            >
              Accept
            </Button>{" "}
            <Button
              variant="danger"
              size="sm"
              name="reject"
              value={group._id}
              onClick={handleClick}
            >
              Reject
            </Button>
          </div>
        </Stack>
      </ListGroup.Item>
    );
  });

  const groups = () => {
    if (groupArray.length >= 1) {
      return <ListGroup>{groupsList}</ListGroup>;
    } else {
      return <p>There are no pending invites</p>;
    }
  };

  return <>{groups()}</>;
}

export default UserInvites;
