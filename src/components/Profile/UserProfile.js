import { useEffect } from "react";
// import { Link } from "react-router-dom";
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



  return (
    <>
      <img src="./img/avatar.png" alt="user avatar"></img>

      <h2>{(store.profileData[0].username).toUpperCase()}</h2>
      <p>{store.profileData[0].firstName + " " + store.profileData[0].lastName}</p>

      <h3>Groups you belong to:</h3>
      {store.profileData[2] && <UserGroups />}


      <h3>Pending Group Invites:</h3>
      <p>**-- where is this data coming from? --**</p>

      <h3>Games played:</h3>
      {store.profileData[1] && <UserGames />}

      <h3>{store.profileData[0].username}'s scoreboard</h3>
      <Button>View stats</Button>
    </>
  );
}

export default UserProfile;
