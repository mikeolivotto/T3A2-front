import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalState } from "../../config/store";
import { getSpecificGame } from "../../services/apiCRUD/gameCRUD";

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

  // console.log(location)
    return (
      <>
      <h2>'Game result' component</h2>
      <h3>Winner is: {gameData.winner}</h3>
      </>
    );
  }
  
  export default GameResult;
  