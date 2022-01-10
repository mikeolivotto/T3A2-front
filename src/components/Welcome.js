import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'


function Welcome() {

    let handleSubmit = (event) => {
      event.preventDefault()
      // send data off for processing with Firebase
    }

    return (
      <div>
        <img src="./img/logo.png" alt="Game King" />
        <h2>Game King</h2>
        <div id="auth">
            <p>Please sign in:</p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="email">email</label>
              <input type="text" name="email" id="email" />

              <label htmlFor="password">password</label>
              <input type="password" name="password" id="password"/>
              
              <Button type="submit">Log in</Button>
            </form>



            
            <p>-</p>

            <Button>
              <Link to="/sign-up" style={{"color": "white", "textDecoration": "none"}}>Sign up</Link>
            </Button>

        </div>
      </div>
    );
  }
  
  export default Welcome;
  