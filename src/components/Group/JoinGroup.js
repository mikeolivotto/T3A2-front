import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import {Link, useNavigate} from "react-router-dom"
import { useGlobalState } from "../../config/store";
import { joinGroup } from "../../services/apiCRUD/groupCRUD";


function JoinGroup() {

  const {store} = useGlobalState()
  const navigate = useNavigate()


  const handleSubmit = (event) => {
    event.preventDefault()
    let joinCode = event.target.joinCode.value;
    joinGroup(joinCode, store.idToken).then((res) => {
      if (res.data.message) {
        alert(res.data.message)
      } else {
        navigate(`/group/${res.data.groupId}`)
      }

    }).catch(err => {console.log(err)});

  }
    return (
      <>
      <h2>'Join Group' component</h2>
      <form onSubmit={handleSubmit}>
        <Stack gap={1} className="col-8 col-md-5 col-lg-3 mx-auto">

          <label htmlFor="joinCode">Join code</label>
          <input type="text" name="joinCode" id="joinCode" />

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
  
  export default JoinGroup;
  