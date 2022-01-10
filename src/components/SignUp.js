import Button from 'react-bootstrap/Button'

function SignUp() {

    let handleSubmit = (event) => {
      event.preventDefault()

    // send data off for processing with Firebase / creating user in the db
    }

    return (
      <div>
        <img src="./img/logo.png" alt="Game King" />
        <h2>Game King</h2>
        <div id="auth">
            <p>Sign up:</p>

            <form onSubmit={handleSubmit}>
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
            </form>





        </div>
      </div>
    );
  }
  
  export default SignUp;
  