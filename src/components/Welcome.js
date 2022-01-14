import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { signIn } from "../services/apiCRUD/profileCRUD.js";
import { useGlobalState } from "../config/store.js";

function Welcome() {
  const { dispatch } = useGlobalState();

  let handleSubmit = async (event) => {
    event.preventDefault();

    // send data off for processing with Firebase
    let signInDetails = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    let firebaseToken = await signIn(signInDetails).then((res) => {
      dispatch({
        type: "setLoggedInUser",
        data: res.data,
      });
    });

    return firebaseToken;
  };

  return (
    <>
      <div className="container-box rounded col-8 col-md-5 col-lg-5 mx-auto p-4">
        <div className="d-flex justify-content-center">
          <img src="./img/gmlogo2.png" alt="Game King" className="img-fluid" />
        </div>
        <div id="auth">
          <form onSubmit={handleSubmit} className="py-4">
            <Stack gap={2}>
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email" />
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" />
            </Stack>
            <Stack direction="horizontal" gap={3} className="flex-wrap pt-4">
              <Button className="button-main px-4" type="submit">
                Log in
              </Button>
              <Button variant="light" className="button-second px-4">
                <Link to="/sign-up" className="main-link">
                  Sign up
                </Link>
              </Button>
            </Stack>
          </form>
        </div>
      </div>
    </>
  );
}

export default Welcome;
