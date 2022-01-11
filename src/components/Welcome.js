import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import {signIn} from '../services/apiCRUD/profileCRUD.js'



function Welcome() {

    let handleSubmit = async(event) => {
      event.preventDefault()
      // send data off for processing with Firebase
      let signInDetails = {
        email: "user4@email.com",
        password: "password4"
      }
      let firebaseToken = await signIn(signInDetails)
      console.log(firebaseToken)

      return firebaseToken

    }

    return (
      <div>
        <img src="./img/logo.png" alt="Game King" />
        <p class="h2">Game King</p>
        <div id="auth">
        {/* <h1 class="h3">Sign in:</h1> */}

            <form onSubmit={handleSubmit}>
            <Stack gap={2} className="col-8 col-md-5 col-lg-3 mx-auto">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password"/>
                
                <Button type="submit">Log in</Button>
              </Stack>
            </form>
            <span>-</span>
            <Stack gap={2} className="col-8 col-md-5 col-lg-3 mx-auto">
              <Button variant="light">
                <Link to="/sign-up" style={{"color": "black", "textDecoration": "none"}}>Sign up</Link>
              </Button>
            </Stack>

        </div>
      </div>
    );
  }
  
  export default Welcome;
  