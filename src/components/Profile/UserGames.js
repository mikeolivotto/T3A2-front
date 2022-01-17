import { useGlobalState } from "../../config/store";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

function UserGames() {
  const { store } = useGlobalState();

  const gamesArray = store.profileData[1].gamesPlayed;

  const gamesList = gamesArray.map((game) => {
    return (
      <ListGroup.Item action key={game._id}>
        <Link to={`/game/${game._id}`}>{game.gameName}</Link>
      </ListGroup.Item>
    );
  });

  const games = () => {
    if (gamesArray.length >= 1) {
      return <ListGroup action>{gamesList}</ListGroup>;
    } else {
      return <p>You have not played any games, amigo</p>;
    }
  };

  return <>{games()}</>;
}

export default UserGames;
