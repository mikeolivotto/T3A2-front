import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup'

function GroupOverview() {

  let handleSubmit = (event) => {
    event.preventDefault()

  // send data off for processing
  }

  return (
    <>
      <h1>[Group name]</h1>
      <h2>Group overview</h2>

      <h3>Members</h3>
      <ListGroup className="col-8 col-md-5 col-lg-3 mx-auto">
        <ListGroup.Item>[player name]</ListGroup.Item>
        <ListGroup.Item>[player name]</ListGroup.Item>
        <ListGroup.Item>[player name]</ListGroup.Item>
        <ListGroup.Item>[player name]</ListGroup.Item>
        <ListGroup.Item>[player name]</ListGroup.Item>
      </ListGroup>

      <h3>Games Played</h3>
      <ListGroup className="col-8 col-md-5 col-lg-3 mx-auto">
        <ListGroup.Item>[Game]</ListGroup.Item>
        <ListGroup.Item>[Game]</ListGroup.Item>
        <ListGroup.Item>[Game]</ListGroup.Item>
        <ListGroup.Item>[Game]</ListGroup.Item>
        <ListGroup.Item>[Game]</ListGroup.Item>

      </ListGroup>


      <Stack gap={2} className="col-8 col-md-5 col-lg-3 mx-auto">
              <Button>
                <Link to="/new-game" style={{"color": "white", "textDecoration": "none"}}>Start a new game</Link>
              </Button>
            </Stack>
    </>
  );
}

export default GroupOverview;
