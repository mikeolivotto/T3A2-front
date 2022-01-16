import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { Link, useParams } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import React, { useState, useEffect } from "react";
import { getSpecificGroup } from "../../services/apiCRUD/groupCRUD";
import { useGlobalState } from "../../config/store";
import GroupGames from "./GroupGames";
import GroupMembers from "./GroupMembers";
import { capitalise } from "../../utils/helperFunctions";
import GroupPendingMembers from "./GroupPendingMembers";

function GroupOverview() {
  const { store, dispatch } = useGlobalState();
  const [groupData, setGroupData] = useState([]);

  console.log(store);
  // console.log(groupData.data.members)
  console.log(groupData);

  let groupName = null;
  let groupMembersArray = [];
  let groupPendingMembersArray = [];
  let joinCode = null;

  if (groupData.data) {
    groupName = groupData.data.groupName;
    groupMembersArray = groupData.data.members;
    groupPendingMembersArray = groupData.data.pendingMembers;
    joinCode = groupData.data.joinCode;
    console.log(groupData.data.members);
  }

  let groupId = useParams().id;

  useEffect(() => {
    getSpecificGroup(groupId, store.idToken).then((res) => {
      setGroupData(res);
      dispatch({ type: "setGroup", data: res.data });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {groupData.data ? <h1>{capitalise(groupName)}</h1> : <h1>Loading...</h1>}
      <p>Join code: {groupData.data ? joinCode : "loading..."} </p>

      <h3>Members</h3>

      {groupData.data ? (
        <GroupMembers members={groupMembersArray} />
      ) : (
        "Loading..."
      )}

      <h3>Pending Members</h3>

      {groupData.data ? (
        <GroupPendingMembers members={groupPendingMembersArray} />
      ) : (
        "Loading..."
      )}

      <h3>Games Played</h3>
      {groupData.data ? <GroupGames /> : "Loading..."}

      <Stack gap={2} className="col-8 col-md-5 col-lg-3 mx-auto">
        <Button>
          <Link
            to={`/group/${groupId}/new-game`}
            style={{ color: "white", textDecoration: "none" }}
          >
            Start a new game
          </Link>
        </Button>
      </Stack>
    </>
  );
}

export default GroupOverview;
