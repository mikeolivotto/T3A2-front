import { useGlobalState } from "../../config/store";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { Link } from "react-router-dom";

function GameInPlay() {
  const { store, dispatch } = useGlobalState();

  console.log(store.gameInPlay.gameName);
  console.log(store.gameInPlay.groupId);
  console.log(store.gameInPlay.gameRules.pointIncrements);

  let gameName = store.gameInPlay.gameName;
  let pointIncrements = store.gameInPlay.gameRules.pointIncrements;

  const pointButtons = pointIncrements.map((point) => {
    return <Button key={point}>{point}</Button>;
  });


  const handleChange = async (event) => {

  }

  const handleSubmit = (e) => {
    e.preventDefault();


  }

  return (
    <>
      <h2>Game: {gameName}</h2>

      <form onSubmit={handleSubmit}>
        <p>Select player:</p>
        { pointButtons }

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
