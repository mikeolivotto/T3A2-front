import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import { Link, useParams } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup'
import React, { useState, useEffect } from 'react';
import { getSpecificGroup } from '../../services/apiCRUD/groupCRUD';
import { useGlobalState } from "../../config/store";

function GroupOverview() {

  const { store, dispatch } = useGlobalState();
  const [groupData, setGroupData] = useState({})

  console.log(groupData.data)
  let { groupName } = groupData.data || "group name"

  let groupId = useParams().id

  useEffect(() => {
    getSpecificGroup(groupId, store.idToken).then((res) => setGroupData(res))
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <>
      <h1>{ groupName }</h1>
      <h2>Group overview</h2>

      <h3>Members</h3>
      <ListGroup className="col-8 col-md-5 col-lg-3 mx-auto">
        <ListGroup.Item>[player name]</ListGroup.Item>
        <ListGroup.Item>[player name]</ListGroup.Item>
        <ListGroup.Item>[player name]</ListGroup.Item>
        <ListGroup.Item>[player name]</ListGroup.Item>
        <ListGroup.Item>[player name]</ListGroup.Item>
      </ListGroup>

      <h3>Games Played</h3>
      <ListGroup className="col-8 col-md-5 col-lg-3 mx-auto">
        <ListGroup.Item>[Game]</ListGroup.Item>
        <ListGroup.Item>[Game]</ListGroup.Item>
        <ListGroup.Item>[Game]</ListGroup.Item>
        <ListGroup.Item>[Game]</ListGroup.Item>
        <ListGroup.Item>[Game]</ListGroup.Item>

      </ListGroup>


      <Stack gap={2} className="col-8 col-md-5 col-lg-3 mx-auto">
              <Button>
                <Link to="/new-game" style={{"color": "white", "textDecoration": "none"}}>Start a new game</Link>
              </Button>
            </Stack>
    </>
  );
}

export default GroupOverview;
