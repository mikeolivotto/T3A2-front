import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalState } from "../../config/store";
import { joinGroup } from "../../services/apiCRUD/groupCRUD";
import { Container } from "react-bootstrap";

function JoinGroup() {
  const { store } = useGlobalState();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let joinCode = event.target.joinCode.value;
    joinGroup(joinCode, store.idToken)
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
        } else {
          navigate(`/group/${res.data.groupId}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Container className="col-6 col-md-6 col-lg-3 col-xl-3 my-5">
        <h2>Join Group</h2>
        <form onSubmit={handleSubmit}>
          <Stack gap={1}>
            <label htmlFor="joinCode">Join code</label>
            <input
              type="text"
              name="joinCode"
              id="joinCode"
              className="bg-light border shade"
            />
          </Stack>
        </form>
        <Stack direction="horizontal" gap={3} className="flex-wrap pt-4">
          <Button className="button-main px-4" type="submit">
            Submit
          </Button>
          <Link to="/">
            <Button variant="light" className="button-second px-4">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Container>
    </>
  );
}

export default JoinGroup;
