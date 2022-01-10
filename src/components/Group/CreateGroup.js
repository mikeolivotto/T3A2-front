import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import { Link } from "react-router-dom";

function CreateGroup() {

  let handleSubmit = (event) => {
    event.preventDefault()

  // send data off for processing
  }

  return (
    <>
      <h1>Create a group</h1>

      <form onSubmit={handleSubmit}>
        <Stack gap={1} className="col-8 col-md-5 col-lg-3 mx-auto">
          <label htmlFor="group-name">Group name</label>
          <input type="text" name="group-name" id="group-name" />

          <p>
            Invite members<br/>
          <em>[somehow handle adding members in]</em>
          </p>

          <Button type="submit">Submit</Button>

          <Button variant="light">
            <Link to="/" style={{ color: "black", textDecoration: "none" }}>
              Cancel
            </Link>
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default CreateGroup;
