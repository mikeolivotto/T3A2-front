import { Routes, Route } from "react-router-dom";

import Nav from "./components/Nav.js";
import Welcome from "./components/Welcome.js";
import UserProfile from "./components/Profile/UserProfile";
import GroupOverview from "./components/Group/GroupOverview";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <Nav />
      <h1>Welcome to Game King!</h1>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/group" element={<GroupOverview />} />
      </Routes>

    </div>
  );
}

export default App;
