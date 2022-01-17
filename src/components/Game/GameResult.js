import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalState } from "../../config/store";
import { getSpecificGame } from "../../services/apiCRUD/gameCRUD";
import { capitalise } from "../../utils/helperFunctions";

function GameResult() {
  const {store} = useGlobalState()
  const gameId = useParams().id
  const [gameData, setGameData] = useState({})
 
  useEffect(() => {
    getSpecificGame(gameId, store.idToken).then((res) => {
      if (res.data.message) {
        alert(res.data.message)
      } else {
        setGameData(res.data)
      }
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

   const {datePlayed, gameName, winner} = gameData

    return (
      <>
      <h2>{gameName ? capitalise(gameName) : "Loading..."}</h2>
       
       <p>Date Played: {datePlayed ? datePlayed.split("T")[0] : "Loading..."}</p>
      
      <h3>Winner: {winner ? capitalise(winner) : "Loading..."}</h3> 
      </>
    );
  }
  
  export default GameResult;
  