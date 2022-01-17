import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { signIn } from "../services/apiCRUD/profileCRUD.js";
import { useGlobalState } from "../config/store.js";
import { Container } from "react-bootstrap";

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
      <Container className="col-8 col-md-5 col-lg-5 col-xl-4 mt-5">
        <div className="d-flex justify-content-center">
          <img src="./img/logo.png" alt="Games Monarch" className="img-fluid" />
        </div>
        <div id="auth">
          <form onSubmit={handleSubmit} className="pt-0">
            <Stack gap={2}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                className="bg-light border shade"
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-light border shade"
              />
            </Stack>
            <Stack direction="horizontal" gap={3} className="flex-wrap pt-4">
              <Button className="button-main px-4" type="submit">
                Log in
              </Button>
              <Link to="/sign-up">
                <Button variant="light" className="button-second px-4">
                  Sign up!
                </Button>
              </Link>
            </Stack>
          </form>
        </div>
      </Container>
    </>
  );
}

export default Welcome;
