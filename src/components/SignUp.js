import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalState } from "../config/store";
import { checkUniqueUsername, signUp } from "../services/apiCRUD/profileCRUD";

function SignUp() {
  const { dispatch } = useGlobalState();
  const navigate = useNavigate();

  let handleSubmit = async (event) => {
    event.preventDefault();
    let { email, username, firstName, lastName, password, confirmPassword } =
      event.target;
    let signUpDetails = {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value,
    };

    // queries database if username is unique
    let uniqueUsername = await checkUniqueUsername(username.value);
    // checks username is unique and passoword is confirmed
    if (uniqueUsername && password.value === confirmPassword.value) {
      // send data off for processing with Firebase / creating user in the db
      console.log("sign-up form has passed validation checks <----------");
      signUp(signUpDetails)
        .then((res) => {
          dispatch({
            type: "setLoggedInUser",
            data: res.data,
          });
          // navigate to home route once global state is set.
          navigate("/");
        })
        .catch((err) => {
          console.log("sign-up failed: ", err);
        });
    } else {
      // Form validation feedback goes here.
      if (!uniqueUsername) console.log("Username is not unique <--------");
      if (password.value !== confirmPassword.value)
        console.log("Please Confirm your password correctly");
    }
  };

  return (
    <div className="container rounded col-8 col-md-5 col-lg-5 mx-auto p-4">
      <div className="d-flex justify-content-center">
        <img src="./img/gmlogo2.png" alt="Game King" className="img-fluid" />
      </div>
      <div id="auth">
        <div className="d-flex justify-content-center">
          <h1 className="h3">Sign up</h1>
        </div>

        <form onSubmit={handleSubmit} className="py-4">
          <Stack gap={2}>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" />

            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" />

            <label htmlFor="firstName">First name</label>
            <input type="text" name="firstName" id="firstName" />

            <label htmlFor="lastName">Last name</label>
            <input type="text" name="lastName" id="lastName" />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />

            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
            />
          </Stack>
          <Stack direction="horizontal" gap={3} className="flex-wrap pt-4">
            <Button className="button-main px-4" type="submit">
              Submit
            </Button>

            <Button variant="light" className="button-second px-4">
              <Link to="/" className="main-link">
                Cancel
              </Link>
            </Button>
          </Stack>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
