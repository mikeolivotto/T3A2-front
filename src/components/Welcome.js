import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { signIn } from "../services/apiCRUD/profileCRUD.js";
import { useGlobalState } from "../config/store.js";

function Welcome() {
  const { store, dispatch } = useGlobalState();

  console.log(store)
  let handleSubmit = async (event) => {
    event.preventDefault();

    // send data off for processing with Firebase
    let signInDetails = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    let firebaseToken = await signIn(signInDetails).then((res) => {
      dispatch({
        type: "updateIdToken",
        data: res.data[0].idToken,
      });
      dispatch({
        type: "setProfile",
        data: res.data[1],
      });
    });

    return firebaseToken;
  };

  return (
    <div>
      <img src="./img/logo.png" alt="Game King" />
      <p className="h2">Game King</p>
      <div id="auth">
        {/* <h1 class="h3">Sign in:</h1> */}

        <form onSubmit={handleSubmit}>
          <Stack gap={2} className="col-8 col-md-5 col-lg-3 mx-auto">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />

            <Button type="submit">Log in</Button>
          </Stack>
        </form>
        <span>-</span>
        <Stack gap={2} className="col-8 col-md-5 col-lg-3 mx-auto">
          <Button variant="light">
            <Link
              to="/sign-up"
              style={{ color: "black", textDecoration: "none" }}
            >
              Sign up
            </Link>
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default Welcome;
