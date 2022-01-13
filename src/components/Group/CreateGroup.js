import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { Link, useNavigate } from "react-router-dom";
import { createNewGroup } from "../../services/apiCRUD/groupCRUD";
import { useGlobalState } from "../../config/store";

function CreateGroup() {
  const { store, dispatch } = useGlobalState();
  const navigate = useNavigate()
  console.log("profile data:", store.profileData);

  let handleSubmit = (event) => {
    event.preventDefault();
    // send data off for processing

    let groupDetails = {
      groupName: event.target.groupName.value,
      adminId: store.profileData[0]._id,
      members: event.target.members.value,
    };

    console.log("group details name:", groupDetails.groupName);
    console.log("group members:", groupDetails.members);

    let createdGroup = createNewGroup(groupDetails, store.idToken).then(
      (res) => {
        dispatch({
          type: "setGroup",
          data: res.data,
        });
        navigate(`/group/${res.data._id}`);
      }
    );
    return createdGroup;
  };

  return (
    <>
      <h1>Create a group</h1>

      <form onSubmit={handleSubmit}>
        <Stack gap={1} className="col-8 col-md-5 col-lg-3 mx-auto">
          <label htmlFor="groupName">Group name</label>
          <input type="text" name="groupName" id="groupName" />
          <label htmlFor="members">Group members</label>
          <input type="text" name="members" id="members" />
          <p>
            Invite members
            <br />
            <em>[somehow handle adding members in]</em>
          </p>
          {store.groupData ? (
            <p>Here's your group name: {store.groupData.groupName}</p>
          ) : null}

          <Button type="submit">Submit</Button>

          <Button variant="light">
            <Link to="/" style={{ color: "black", textDecoration: "none" }}>
              Cancel
            </Link>
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default CreateGroup;
