function Welcome() {
    return (
      <div style={{border: "1px solid"}}>
        <p>This is the welcome component</p>
        <img src="./img/logo.png" alt="Game King" />
        <h2>Game King</h2>
        <div id="auth">
            <p>Please sign in:</p>
            <p>[Firebase Auth goes here]</p>
            <p>-</p>
            <p>[Sign up]</p>

        </div>
      </div>
    );
  }
  
  export default Welcome;
  