import { useGlobalState } from "../../config/store";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import ListGroup from "react-bootstrap/ListGroup";
import { capitalise } from "../../utils/helperFunctions";
import React, { useState, useEffect } from "react";

function GameInPlay() {
  const { store } = useGlobalState();

  const [currentPlayer, setCurrentPlayer] = useState(null)
  const [addOrRemove, setAddOrRemove] = useState(null)
  const [scores, setScores] = useState({})

  console.log(scores)

  const membersArray = store.groupData.members

  useEffect(() => {
    membersArray.map((member) => {
      return setScores({...scores, [member]: 0})
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  let gameName = store.gameInPlay.gameName;
  let pointIncrements = store.gameInPlay.gameRules.pointIncrements;

  const adjustScore = (event) => {
    let playerScore = scores[currentPlayer]
    let operation = addOrRemove
    let amount = event.target.value

    let newScore
    if (operation === "add") {
      newScore = playerScore + amount
      setScores({...scores, [currentPlayer]: newScore})
    } else {
      newScore = playerScore - amount
      setScores({...scores, [currentPlayer]: newScore})
    }

  }

  const pointButtons = pointIncrements.map((point) => {
    return <Button key={point} value={point} onClick={adjustScore}>{point}</Button>;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const selectPlayer = (event) => {
    setCurrentPlayer(event.target.name)
  }

  const membersList = membersArray.map((member, index) => {
    return <ListGroup.Item key={ index }>
         <label><input type="radio" value={member} name={member} onClick={selectPlayer} /> { capitalise(member) }</label>
      </ListGroup.Item>
  })

  const toggleAddRemove = (event) => {
    if (event.target.name === "add") {
      setAddOrRemove("add")
    } else {
      setAddOrRemove("subtract")
    }
  }


    
  return (
    <>
      <h2>Game: {gameName}</h2>

      <form onSubmit={handleSubmit}>
        <p>Select player:</p>

        <ListGroup className="col-8 col-md-5 col-lg-3 mx-auto">
          { membersList }
        </ListGroup>

        <div>
          <Button name="add" onClick={toggleAddRemove}>+</Button> <Button name="subtract" onClick={toggleAddRemove}>-</Button>
        </div>

        Points
        <div>{pointButtons}</div>

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
