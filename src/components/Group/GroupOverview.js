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

function GroupOverview() {
  const { store } = useGlobalState();
  const [groupData, setGroupData] = useState([]);
  
  console.log(store)
  // console.log(groupData.data.members)
  console.log(groupData)
    
    
  let groupName = null
  let groupMembersArray = []
  let groupPendingMembersArray = []
  let joinCode = null

  if(groupData.data) {
    groupName = groupData.data.groupName
    groupMembersArray = groupData.data.members
    groupPendingMembersArray = groupData.data.pendingMembers
    joinCode = groupData.data.joinCode
    console.log(groupData.data.members)
  }

  let groupId = useParams().id;

  useEffect(() => {
    getSpecificGroup(groupId, store.idToken).then((res) => setGroupData(res));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h1>{groupData.data && capitalise(groupName)}</h1>
      <p>Join code: {groupData.data && joinCode} </p>

      <h3>Members</h3>
      <ListGroup className="col-8 col-md-5 col-lg-3 mx-auto">
        <GroupMembers members={groupMembersArray} />
      </ListGroup>

      <h3>Pending Members</h3>

      <ListGroup className="col-8 col-md-5 col-lg-3 mx-auto">
        <GroupMembers members={groupPendingMembersArray} />
      </ListGroup>

      <h3>Games Played</h3>
      <GroupGames />

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
