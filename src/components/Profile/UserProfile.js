import { useEffect } from "react";
import { Link } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { useGlobalState } from "../../config/store";
import { getSpecificProfile } from "../../services/apiCRUD/profileCRUD";
import UserGroups from "./UserGroups";
import UserGames from "./UserGames";
import "../../styles/profile.css";
import Container from "react-bootstrap/Container";
import { capitalise } from "../../utils/helperFunctions";

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
      <Container className="col-10 col-md-6 mb-5">
        <div className="d-flex justify-content-center">
          <img
            src="./img/profile-photo.png"
            alt="user avatar"
            className="profile-img img-fluid mb-3"
          ></img>
        </div>
        <h1>{store.profileData[0].username.toUpperCase()}</h1>
        <p className="profile-name mb-2">
          { capitalise(store.profileData[0].firstName) + " " +  capitalise(store.profileData[0].lastName)}
        </p>

        <Stack
          direction="horizontal"
          gap={3}
          className="d-flex justify-content-between my-3"
        >
          <div className="bg-light border">Games played: {gamesPlayed}</div>
          <div className="bg-light border">
            Games won: {gamesWon} / {gamesWonPC}%
          </div>
          <div className="bg-light border">
            Games lost: {gamesLost} / {gamesLostPC}%
          </div>
        </Stack>

        <h4 className="main-text">Groups you belong to:</h4>
        {store.profileData[2] && <UserGroups />}

        <h4 className="main-text">Pending Group Invites:</h4>
        <p>**-- where is this data coming from? --**</p>
        <h4 className="main-text">Games played:</h4>
        {store.profileData[1] && <UserGames />}

        <Stack gap={2} direction="horizontal" className="flex-wrap pt-4">
          <Button className="button-main px-4">
            <Link to="/create-group" className="second-link">
              Create a Group
            </Link>
          </Button>
          <Button variant="light" className="button-second px-4">
            <Link to="/join-group" className="main-link">
              Join a Group
            </Link>
          </Button>
        </Stack>
      </Container>
    </>
  );
}

export default UserProfile;
