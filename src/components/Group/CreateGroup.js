import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { Link, useNavigate } from "react-router-dom";
import { createNewGroup } from "../../services/apiCRUD/groupCRUD";
import { useGlobalState } from "../../config/store";
import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { getAllUsernames } from "../../services/apiCRUD/profileCRUD";
import { Container } from "react-bootstrap";

function CreateGroup() {
  const { store, dispatch } = useGlobalState();
  const [members, setMembers] = useState([]);
  const [profileList, setProfileList] = useState([]);

  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      let usernames = await getAllUsernames().then((res) => {
        let filteredArray = res.data.usernames.filter(
          (x) => x !== store.profileData[0].username
        );
        setProfileList(filteredArray);
      });
      return usernames;
    };
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const removeOnClick = (event) => {
    const tempMembersArray = [...members];
    const indexOfMember = tempMembersArray.indexOf(event.target.value);
    tempMembersArray.splice(indexOfMember, 1);
    setMembers(tempMembersArray);
  };
  // PLACEHOLDER: list of all usernames of registered users.
  // const profileList = ["bill", "jean", "sarah", "sandra", "saramiah"]

  // updates members state with the added username, checks if already present
  const addOnClick = (event) => {
    let tempMembersArray = [...members];
    if (!tempMembersArray.includes(event.target.value)) {
      tempMembersArray.push(event.target.value);
      setMembers(tempMembersArray);
    }
  };

  const memberList = members.map((member) => {
    return (
      <ListGroup.Item key={member}>
        {member}{" "}
        <Button variant="link" value={member} onClick={removeOnClick}>
          Remove
        </Button>
      </ListGroup.Item>
    );
  });

  // updates filter state with the current value of the search for players field.
  const handleChange = (event) => {
    event.preventDefault();
    // the "^" means the regex checks from the start of the word, the "i" means case insensitive
    setFilter(new RegExp(`^${event.target.value}`, "i"));
    let copy = [...profileList];
    setProfileList([]);
    setProfileList(copy);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // send data off for processing

    let groupDetails = {
      groupName: event.target.groupName.value,
      adminId: store.profileData[0]._id,
      joinCode: event.target.joinCode.value,
      members: [store.profileData[0].username],
      pendingMembers: members,
    };

    let createdGroup = createNewGroup(groupDetails, store.idToken)
      .then((res) => {
        // Check response from server for any errors with unique join code or idToken
        if (res.data.message) {
          console.log(`Error: ${res.data.message}`);
        } else {
          dispatch({
            type: "setGroup",
            data: res.data,
          });
          navigate(`/group/${res.data._id}`);
        }
      })
      .catch((error) =>
        console.log(`Error has occured when creating new group: \n${error}`)
      );
    return createdGroup;
  };

  return (
    <>
      <Container className="col-8 col-md-5 col-lg-5 col-xl-5 my-5">
        <h2>Create a group</h2>
        <form onSubmit={handleSubmit}>
          <Stack gap={2}>
            <label htmlFor="groupName">Group name</label>
            <input
              type="text"
              name="groupName"
              id="groupName"
              className="bg-light border shade"
            />
            <label htmlFor="joinCode">Join Code</label>
            <input
              type="text"
              name="joinCode"
              id="joinCode"
              className="bg-light border shade"
            />

            <p className="mb-1 mt-2">Group members</p>
            <ListGroup>
              <ListGroup.Item>
                You - {store.profileData[0].username} (Group admin){" "}
              </ListGroup.Item>
              {memberList}
            </ListGroup>

            <label htmlFor="searchForPlayers" className="mb-1 mt-2">
              Search for players
            </label>
            <input
              type="text"
              name="searchForPlayers"
              id="searchForPlayers"
              className="bg-light border shade"
              onChange={handleChange}
            />

            {profileList.length === 0 ? null : (
              <div style={{ maxHeight: "40vh", overflowY: "auto" }}>
                <div className="mt-3">
                  <ListGroup>
                    {profileList.map((profile, index) => {
                      return filter ? (
                        filter.test(profile) ? (
                          <ListGroup.Item key={index}>
                            {profile}{" "}
                            <Button
                              key={index}
                              variant="link"
                              value={profile}
                              onClick={addOnClick}
                            >
                              Add to group
                            </Button>
                          </ListGroup.Item>
                        ) : null
                      ) : (
                        <ListGroup.Item key={index}>
                          <Stack
                            direction="horizontal"
                            gap={3}
                            className="flex-wrap"
                          >
                            {profile}{" "}
                            <div className="ms-auto">
                              <Button
                                key={index}
                                variant="link"
                                value={profile}
                                onClick={addOnClick}
                              >
                                Add to group
                              </Button>
                            </div>
                          </Stack>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                </div>
              </div>
            )}
            {store.groupData ? (
              <p>Here's your group name: {store.groupData.groupName}</p>
            ) : null}
          </Stack>

          <Stack direction="horizontal" gap={3} className="flex-wrap pt-4">
            <Button className="button-main px-4" type="submit">
              Submit
            </Button>
            <Link to="/">
              <Button
                variant="light"
                className="button-second px-4"
                variant="light"
              >
                Cancel
              </Button>
            </Link>
          </Stack>
        </form>
      </Container>
    </>
  );
}

export default CreateGroup;
