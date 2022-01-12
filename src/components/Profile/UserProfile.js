import { useEffect } from "react";
import { Link } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { useGlobalState } from "../../config/store";
import { getSpecificProfile } from "../../services/apiCRUD/profileCRUD";
import UserGroups from "./UserGroups";
import UserGames from "./UserGames";

function UserProfile() {
  const { store, dispatch } = useGlobalState();

  console.log(store.profileData)

  // useEffect warnings disabled, may hide problems.
  useEffect(() => {
    const profileId = store.profileData[0]._id
    getSpecificProfile(profileId, store.idToken).then((res) => dispatch({type:"setProfile",data:res.data}))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // const [profile,games,groups,adminOf] = store.profileData

  let gamesPlayed = store.profileData[1] ? store.profileData[1].gamesPlayed.length : 0
  let gamesWon = store.profileData[1] ? store.profileData[1].gamesWon.length : 0
  let gamesWonPC = gamesWon === 0 ? 0 : (gamesWon/gamesPlayed)*100
  let gamesLost = gamesPlayed - gamesWon
  let gamesLostPC = gamesLost === 0 ? 0 : (gamesLost/gamesPlayed)*100

  return (
    <>
      <img src="./img/avatar.png" alt="user avatar"></img>

      <h2>{(store.profileData[0].username).toUpperCase()}</h2>
      <p>{store.profileData[0].firstName + " " + store.profileData[0].lastName}</p>

      <h3>Groups you belong to:</h3>
      {store.profileData[2] && <UserGroups/>}


      <h3>Pending Group Invites:</h3>
      <p>**-- where is this data coming from? --**</p>

      <h3>Games played:</h3>
      {store.profileData[1] && <UserGames />}

      <h3>{store.profileData[0].username}'s scoreboard</h3>
      <p>Games played: { gamesPlayed }</p>
      <p>Games won: { gamesWon } / { gamesWonPC }%</p>
      <p>Games lost: { gamesLost } / { gamesLostPC }%</p>

  

      <Stack gap={2} className="col-8 col-md-5 col-lg-3 mx-auto">
          <Button>
            <Link to="/create-group" style={{ color: "white", textDecoration: "none" }}>
              Create a Group
            </Link>
          </Button>

          <Button>
            <Link to="/join-group" style={{ color: "white", textDecoration: "none" }}>
              Join a Group
            </Link>
          </Button>
        </Stack>
    </>
  );
}

export default UserProfile;
