import { useGlobalState } from "../../config/store";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import ListGroup from "react-bootstrap/ListGroup";

function GameInPlay() {
  const { store } = useGlobalState();

  console.log(store.groupData.members)
  const membersArray = store.groupData.members

  let gameName = store.gameInPlay.gameName;
  let pointIncrements = store.gameInPlay.gameRules.pointIncrements;

  const pointButtons = pointIncrements.map((point) => {
    return <Button key={point}>{point}</Button>;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const membersList = membersArray.map((member, index) => {
    return <ListGroup.Item key={ index }>{ member } [select player]</ListGroup.Item>
  })

  return (
    <>
      <h2>Game: {gameName}</h2>

      <form onSubmit={handleSubmit}>
        <p>Select player:</p>

        <ListGroup className="col-8 col-md-5 col-lg-3 mx-auto">
          { membersList }
        </ListGroup>

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
