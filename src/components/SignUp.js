import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import { Link } from "react-router-dom";

function SignUp() {

    let handleSubmit = (event) => {
      event.preventDefault()

    // send data off for processing with Firebase / creating user in the db
    }

    return (
      <div>
        <img src="./img/logo.png" alt="Game King" />
        <p class="h2">Game King</p>
        <div id="auth">
            <h1 class="h3">Sign up:</h1>

            <form onSubmit={handleSubmit}>
            <Stack gap={1} className="col-8 col-md-5 col-lg-3 mx-auto">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email" />

              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" />

              <label htmlFor="firstName">First name</label>
              <input type="text" name="firstName" id="firstName" />

              <label htmlFor="lastName">Last name</label>
              <input type="text" name="lastName" id="lastName" />

              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password"/>

              <label htmlFor="confirm-password">Confirm password</label>
              <input type="password" name="confirm-password" id="confirm-password"/>
              
              <Button type="submit">Submit</Button>

              <Button variant="light">
                <Link to="/" style={{"color": "black", "textDecoration": "none"}}>Cancel</Link>
              </Button>
            </Stack>
            </form>





        </div>
      </div>
    );
  }
  
  export default SignUp;
  