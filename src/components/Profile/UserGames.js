import { useGlobalState } from "../../config/store";
import ListGroup from 'react-bootstrap/ListGroup';

function UserGames() {

  const { store } = useGlobalState()

  const gamesArray = store.profileData[1].gamesPlayed



  const gamesList = gamesArray.map((group) => {
    return <ListGroup.Item key={group.id}>{ group }</ListGroup.Item>
  })


  const games = () => {
    if(gamesArray.length >= 1) {
      return <ListGroup className="col-8 col-md-5 col-lg-3 mx-auto">{gamesList}</ListGroup>
    } else {
      return <p>You have not played any games, amigo</p>
    }
  }

    return (
      <>
      { games() }
      </>
    );
  }
  
  export default UserGames;
  