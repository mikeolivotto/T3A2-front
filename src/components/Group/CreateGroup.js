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
      joinCode: event.target.joinCode.value,
    };

    console.log("group details name:", groupDetails.groupName);
    console.log("group join code:", groupDetails.joinCode);

    let createdGroup = createNewGroup(groupDetails, store.idToken).then(
      (res) => {
        // Check response from server for any errors with unique join code or idToken
        if (res.data.message) {
          console.log(`Error: ${res.data.message}`)
        } else {
          dispatch({
            type: "setGroup",
            data: res.data,
          });
          navigate(`/group/${res.data._id}`);
        }
      }
    ).catch(error => console.log(`Error has occured when creating new group: \n${error}`));
    return createdGroup;
  };

  return (
    <>
      <h1>Create a group</h1>

      <form onSubmit={handleSubmit}>
        <Stack gap={1} className="col-8 col-md-5 col-lg-3 mx-auto">
          <label htmlFor="groupName">Group name</label>
          <input type="text" name="groupName" id="groupName" />
          <label htmlFor="joinCode">Join code</label>
          <input type="text" name="joinCode" id="joinCode" />
          {/* <p>
            Invite members
            <br />
            <em>[somehow handle adding members in]</em>
          </p>
          {store.groupData ? (
            <p>Here's your group name: {store.groupData.groupName}</p>
          ) : null} */}

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
