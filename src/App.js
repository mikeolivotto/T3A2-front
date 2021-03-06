import { Routes, Route } from "react-router-dom";
import { useReducer } from "react";
import Nav from "./components/Nav.js";
import Welcome from "./components/Welcome.js";
import SignUp from "./components/SignUp.js";
import UserProfile from "./components/Profile/UserProfile";
import GroupOverview from "./components/Group/GroupOverview";
import CreateGroup from "./components/Group/CreateGroup";
import CreateGame from "./components/Game/CreateGame";
import GameInPlay from "./components/Game/GameInPlay";
import GameResult from "./components/Game/GameResult.js";
import "./styles/App.css";
import "./styles/globalStyles.css";
import { initialState } from "./config/initialState.js";
import { stateReducer } from "./config/stateReducer.js";
import React from "react";
import { StateContext } from "./config/store.js";
import JoinGroup from "./components/Group/JoinGroup.js";

function App() {
  const [store, dispatch] = useReducer(stateReducer, initialState);

  return (
    <StateContext.Provider value={{ store, dispatch }}>
      <div className="App">
        <Nav />
        <Routes>
          <Route
            path="/"
            element={store.idToken ? <UserProfile /> : <Welcome />}
          />
          {/* <Route path="/" element={<Welcome />} /> */}

          <Route path="/sign-up" element={<SignUp />} />

          <Route path="/group/:id" element={<GroupOverview />} />
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/join-group" element={<JoinGroup />} />
          <Route path="/group/:id/new-game" element={<CreateGame />} />
          <Route path="/game/" element={<GameInPlay />} />
          <Route path="/game/:id" element={<GameResult />} />
        </Routes>
      </div>
    </StateContext.Provider>
  );
}

export default App;
