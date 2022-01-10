import { Routes, Route } from "react-router-dom";

import Nav from "./components/Nav.js";
import Welcome from "./components/Welcome.js";
import SignUp from "./components/SignUp.js";
import UserProfile from "./components/Profile/UserProfile";
import GroupOverview from "./components/Group/GroupOverview";
import CreateGroup from "./components/Group/CreateGroup";
import CreateGame from "./components/Game/CreateGame";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="/profile" element={<UserProfile />} />
        <Route path="/group/:id" element={<GroupOverview />} />
        <Route path="/create-group" element={<CreateGroup />} />
        <Route path="/new-game" element={<CreateGame />} />



      </Routes>

    </div>
  );
}

export default App;
