import { useGlobalState } from "../../config/store";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import ListGroup from "react-bootstrap/ListGroup";
import { capitalise } from "../../utils/helperFunctions";
import React, { useState, useEffect } from "react";
import { createGame } from "../../services/apiCRUD/gameCRUD";
import { useNavigate } from "react-router-dom";

function GameInPlay() {
  const { store } = useGlobalState();
  const navigate = useNavigate();

  const membersArray = store.groupData.members
  const [currentPlayer, setCurrentPlayer] = useState(membersArray[0])
  const [scores, setScores] = useState({})
  // const [addOrRemove, setAddOrRemove] = useState("add")
  
  let pointIncrements = store.gameInPlay.gameRules.pointIncrements;
  const [increment, setIncrement] = useState(Number(pointIncrements[0]));

  let gameName = store.gameInPlay.gameName;

  
  useEffect(() => {
    let scoreObject = scores
    for (const member of membersArray) {
      scoreObject[member] = 0
    }
    setScores(scoreObject)

  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  console.log(scores)

  const selectPlayer = (event) => {
    setCurrentPlayer(event.target.name)

  }
  
  const incrementHandler = (event) => {
    event.preventDefault();
    setIncrement(Number(event.target.value))
  }
  
  const plusHandler = (event) => {
    setScores({...scores, [currentPlayer]: scores[currentPlayer] + increment})
  }
  
  const minusHandler = (event) => {
    setScores({...scores, [currentPlayer]: scores[currentPlayer] - increment})
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let highScore = 0;
    let winner;
    for (let player in scores) {
      if (scores[player] > highScore) {
        highScore = scores[player];
        winner = player;
      }
    }
    let updatedGameData = {
      ...store.gameInPlay,
      players: membersArray,
      winner: winner,
      scoreboard: scores,
      datePlayed: new Date()
    }

    createGame(updatedGameData, store.idToken).then(res => {
      if (res.data.message) {
        alert(res.data.message);
      } else {
        navigate(`/game/${res.data._id}`)
      }
    }).catch(error => console.log(error))
    console.log(updatedGameData)
  };
  
  const pointButtons = pointIncrements.map((point) => {
    return <Button key={point} value={point} onClick={incrementHandler} style={(Number(point) === increment) ? {backgroundColor: "green"} : {}}>{point}</Button>;
  });
  
  const membersList = membersArray.map((member, index) => {
    return <ListGroup.Item key={ index }>
         <label><input type="radio" value={member} name={member} checked={member === currentPlayer} onChange={selectPlayer}/> { capitalise(member) }: {scores[member]} points</label>
      </ListGroup.Item>
  })
  
 
  return (
    <>
      <h2>Game: {gameName}</h2>

      <form onSubmit={handleSubmit}>
        <p>Select player:</p>

        <ListGroup className="col-8 col-md-5 col-lg-3 mx-auto">
          { membersList }
        </ListGroup>

        Points
        <div>{pointButtons}</div>

        <div>
          <Button name="add" onClick={plusHandler}>+</Button>
          {/* <div>{scores[currentPlayer]}</div> */}
          <Button name="subtract" onClick={minusHandler}>-</Button>
        </div>


        <Stack gap={1} className="col-8 col-md-5 col-lg-3 mx-auto">
          <Button type="submit">End game</Button>
        </Stack>
      </form>
    </>
  );
}

export default GameInPlay;
