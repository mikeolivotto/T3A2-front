import { useGlobalState } from "../../config/store";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import ListGroup from "react-bootstrap/ListGroup";
import { capitalise } from "../../utils/helperFunctions";
import React, { useState, useEffect } from "react";

function GameInPlay() {
  const { store } = useGlobalState();

  const [currentPlayer, setCurrentPlayer] = useState(null)
  const [scores, setScores] = useState({})
  // const [addOrRemove, setAddOrRemove] = useState("add")
  
  let pointIncrements = store.gameInPlay.gameRules.pointIncrements;
  const [increment, setIncrement] = useState(Number(pointIncrements[0]));

  console.log(scores)

  const membersArray = store.groupData.members
  let gameName = store.gameInPlay.gameName;

  useEffect(() => {
    membersArray.map((member) => {
      return setScores({...scores, [member]: 0})
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
  };
  
  const pointButtons = pointIncrements.map((point) => {
    return <Button key={point} value={point} onClick={incrementHandler} style={(Number(point) === increment) ? {backgroundColor: "green"} : {}}>{point}</Button>;
  });
  
  const membersList = membersArray.map((member, index) => {
    return <ListGroup.Item key={ index }>
         <label><input type="radio" value={member} name={member} onClick={selectPlayer} /> { capitalise(member) }: {scores[member]} points</label>
      </ListGroup.Item>
  })
  
  // const adjustScore = (event) => {
  //   let playerScore = scores[currentPlayer]
  //   let operation = addOrRemove
  //   let amount = parseInt(event.target.value)
  //   console.log(`Type of 'amount' = ${typeof(amount)}`)

  //   let newScore
  //   if (operation === "add") {
  //     newScore = playerScore + amount
  //     setScores({...scores, [currentPlayer]: newScore})
  //   } else {
  //     newScore = playerScore - amount
  //     setScores({...scores, [currentPlayer]: newScore})
  //   }

  // }

  // const toggleAddRemove = (event) => {
  //   if (event.target.name === "add") {
  //     setAddOrRemove("add")
  //   } else {
  //     setAddOrRemove("subtract")
  //   }
  // }
 
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
          <div>{scores[currentPlayer]}</div>
          <Button name="subtract" onClick={minusHandler}>-</Button>
        </div>


        <Stack gap={1} className="col-8 col-md-5 col-lg-3 mx-auto">
          <Button type="submit">End game</Button>
          {/* <Button variant="light">
            <Link to={`/group/${groupId}`} style={{ color: "black", textDecoration: "none" }}>
              Cancel
            </Link>
          </Button> */}
        </Stack>
      </form>
    </>
  );
}

export default GameInPlay;
