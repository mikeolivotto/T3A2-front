import ListGroup from 'react-bootstrap/ListGroup';
import { getGroupGames } from "../../services/apiCRUD/groupCRUD";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

function GroupGames() {

  const [groupGames, setGroupGames] = useState([]);
  
  let groupId = useParams().id;

  useEffect(() => {
    getGroupGames(groupId).then((res) => setGroupGames(res));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  let gameArray = []

  if (groupGames.data) {
    gameArray = groupGames.data
  }




  const gamesList = gameArray.map((game) => {
    return <ListGroup.Item key={ game._id }>
        { game.gameName }
      </ListGroup.Item>
  })


  const games = () => {
    if(gameArray.length >= 1) {
      return <ListGroup className="col-8 col-md-5 col-lg-3 mx-auto">{ gamesList }</ListGroup>
    } else {
      return <p>Your group has not played any games</p>
    }
  }

    return (
      <div style={{maxHeight: "20vh", overflowY: "auto"}}>
      { games() }
      </div>
    );
  }
  
  export default GroupGames;
  