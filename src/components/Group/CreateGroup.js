import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { Link } from "react-router-dom";
import { createNewGroup } from "../../services/apiCRUD/groupCRUD";
import { useGlobalState } from "../../config/store";

function CreateGroup() {
  const { store, dispatch } = useGlobalState();

  console.log(store);

  let handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
    // send data off for processing
    let groupDetails = {
      groupName: event.target.groupName.value,
      adminId: store.profileData[0]._id,
      members: event.target.members.value,
    };

    let createdGroup = createNewGroup(groupDetails).then((res) => {
      dispatch({
        type: "setGroup",
        data: res.data,
      });
    });

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
