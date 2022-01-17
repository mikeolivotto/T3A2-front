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
import Col from "react-bootstrap/Col";

function UserProfile() {
  const { store, dispatch } = useGlobalState();

  console.log(store.profileData);

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
          <img
            src="./img/profile3.png"
            alt="user avatar"
            className="profile-img img-fluid mb-3"
          ></img>
          <Col className="d-flex align-items-end m-0">
            <div>
              <div>
                <h2>{store.profileData[0].username.toUpperCase()}</h2>
              </div>
              <div>
                <p>
                  {capitalise(store.profileData[0].firstName) +
                    " " +
                    capitalise(store.profileData[0].lastName)}
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <div className="d-flex justify-content-between my-3">
            <div className="score-item">Games played: {gamesPlayed}</div>
            <div className="score-item">
              Games won: {gamesWon} / {gamesWonPC}%
            </div>
            <div className="score-item">
              Games lost: {gamesLost} / {gamesLostPC}%
            </div>
          </div>
        </Row>
        <Row className="mt-2">
          <h4 className="main-text">Groups you belong to:</h4>
          {store.profileData[2] ? <UserGroups /> : "loading..."}
        </Row>
        <Row className="mt-4">
          <h4 className="main-text">Pending Group Invites:</h4>{" "}
          {<div>store.profileData[4]</div> ? (
            <div>
              <UserInvites />
            </div>
          ) : (
            "loading..."
          )}
        </Row>
        <Row className="mt-4">
          <h4 className="main-text">Games played:</h4>
          {store.profileData[1] && <UserGames />}
        </Row>

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
