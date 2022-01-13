import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { Link, useParams } from "react-router-dom";
import { useGlobalState } from "../../config/store";
import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert'

function CreateGame() {
  const { dispatch } = useGlobalState();

  const [gameName, setGameName] = useState(null)

  const [increments, setIncrements] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false
  });

  const [warning, setWarning] = useState(false)

  let groupId = useParams().id;

  let handleChange = async (event) => {
    if (event.target.id === "gameName" && (event.target.value).length >= 1) {
      setWarning(false)
      setGameName(event.target.value);
    } else if ((event.target.value > 0) && (event.target.value <= 10)) {
      setWarning(false)
      setIncrements({
        ...increments,
        [event.target.value]: !increments[event.target.value],
      });
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // create points array
    let pointsArray = []
    for (const point in increments) {
      increments[point] === true && pointsArray.push(point)
    }

    // if game name is empty or no point increments are set, warn user
    if ((Boolean(gameName) === false) || (pointsArray.length === 0)) {
      setWarning(true)
    } else {
      dispatch({
        type: "setGame",
        data: {
          gameName: gameName,
          groupId: groupId,
          gameRules: {
            pointIncrements: pointsArray
          }
        }
      })
    }

    
  };

  const pointsList = Object.keys(increments).map((increment) => {
    return (
      <label htmlFor={increment} key={increment}>
        <input
          type="checkbox"
          id={increment}
          value={increment}
          onChange={handleChange}
        ></input>
        {` ${increment}`}
      </label>
    );
  });

  return (
    <>
      <h2>Start a new game</h2>
      { (warning) && <Alert variant="danger">You must enter a game name and/or increments</Alert> }
      <form onSubmit={handleSubmit}>
        <Stack gap={1} className="col-8 col-md-5 col-lg-3 mx-auto">
          <label htmlFor="gameName">Game name:</label>
          <input
            type="text"
            name="gameName"
            id="gameName"
            onChange={handleChange}
          />
          Set point increments:
          {pointsList}
          <Button type="submit">Submit</Button>
          <Button variant="light">
            <Link to={`/group/${groupId}`} style={{ color: "black", textDecoration: "none" }}>
              Cancel
            </Link>
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default CreateGame;
