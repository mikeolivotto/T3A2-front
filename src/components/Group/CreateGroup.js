import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { Link } from "react-router-dom";
import { createNewGroup } from "../../services/apiCRUD/groupCRUD";
import { useGlobalState } from "../../config/store";
import React, { useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';

function CreateGroup() {
  const { store, dispatch } = useGlobalState();

  const [ members, setMembers ] = useState([])

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

        <p>Group members</p>
        <ListGroup>
          <ListGroup.Item>Current User (admin)</ListGroup.Item>
        </ListGroup>


          <p>Invite members</p>


          <p>Suggested functionality for MVP (by Mike) :</p>
          <ul>
            <li>
              Render a{" "}
              <a href="https://www.w3schools.com/tags/tag_select.asp">
                'select' drop-down
              </a>{" "}
              of all registered players
            </li>
            <li>
              Each time you select a player, they are added to a local state for
              "groupMembers"
            </li>
            <li>
              After adding a member, they are added to a List of group members,
              with a "remove" option next to their name
            </li>
            <li>
              Once happy with the group, onSubmit sends a post request to api to
              create new group
            </li>
          </ul>

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
