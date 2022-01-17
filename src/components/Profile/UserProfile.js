import { useEffect } from "react";
import { Link } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { useGlobalState } from "../../config/store";
import { getSpecificProfile } from "../../services/apiCRUD/profileCRUD";
import UserGroups from "./UserGroups";
import UserInvites from "./UserInvites";
import UserGames from "./UserGames";
import "../../styles/profile.css";
import Container from "react-bootstrap/Container";
import { capitalise } from "../../utils/helperFunctions";
import Row from "react-bootstrap/Row";

function UserProfile() {
  const { store, dispatch } = useGlobalState();

  // useEffect warnings disabled, may hide problems.
  useEffect(() => {
    const profileId = store.profileData[0]._id;
    getSpecificProfile(profileId, store.idToken).then((res) =>
      dispatch({ type: "setProfile", data: res.data })
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // const [profile,games,groups,adminOf] = store.profileData

  let gamesPlayed = store.profileData[1]
    ? store.profileData[1].gamesPlayed.length
    : 0;
  let gamesWon = store.profileData[1]
    ? store.profileData[1].gamesWon.length
    : 0;
  let gamesWonPC = gamesWon === 0 ? 0 : (gamesWon / gamesPlayed) * 100;
  let gamesLost = gamesPlayed - gamesWon;
  let gamesLostPC = gamesLost === 0 ? 0 : (gamesLost / gamesPlayed) * 100;

  return (
    <>
      <Container className="profile-card col-10 col-md-6 col-lg-6 col-xl-6 mb-5">
        <Row>
          <div className="d-flex justify-content-center">
            <img
              src="./img/profile3.png"
              alt="user avatar"
              className="profile-img img-fluid mb-3 rounded"
            ></img>
          </div>
          <div className="d-flex justify-content-center">
            <h1>{store.profileData[0].username.toUpperCase()}</h1>
          </div>
          <div className="d-flex justify-content-center">
            <p className="profile-name mb-2">
              {capitalise(store.profileData[0].firstName) +
                " " +
                capitalise(store.profileData[0].lastName)}
            </p>
          </div>
        </Row>
        <hr></hr>
        <div className="d-flex justify-content-between my-3 mt-4">
          <div className="score-item">
            <span>Games played </span>
            <hr />
            {gamesPlayed}
          </div>
          <div className="score-item">
            <span>Games won</span> <hr /> {gamesWon} / {gamesWonPC}%
          </div>
          <div className="score-item">
            <span>Games lost </span>
            <hr /> {gamesLost} / {gamesLostPC}%
          </div>
        </div>

        {/* Groups user belongs to */}
        <div>
          <h5 className="main-text">Groups you belong to:</h5>
          {store.profileData[2] ? <UserGroups /> : "loading..."}
        </div>

        {/* User's pending group invites */}
        <h4 className="main-text">Pending Group Invites:</h4>
        {store.profileData[4] ? <UserInvites /> : "loading..."}

        {/* Games played by user  */}
        <div>
          <h4 className="main-text">Games played:</h4>
          {store.profileData[1] && <UserGames />}
        </div>
        <Stack direction="horizontal" gap={3} className="flex-wrap pt-4">
          <Link to="/create-group" className="second-link">
            <Button className="button-main px-4">Create a Group</Button>
          </Link>
          <Link to="/join-group" className="main-link">
            <Button variant="light" className="button-second px-4">
              Join a Group
            </Button>
          </Link>
        </Stack>
      </Container>
    </>
  );
}

export default UserProfile;
