import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import NotFoundPage from "./components/serverPages/NotFoundPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/authPages/login";
import Registration from "./components/authPages/registration";
import CreateTournamentPage from "./components/createTpurnament/createTournamentPage";
import Profile from "./components/serverPages/profile";
import TournamentPage from "./components/openTournament/tournamentPage";
import ServerError from "./components/serverPages/500";
import ActiveTournamentPage from "./components/activeTournament/activeTournamentsPage";
import Developers from "./components/serverPages/developers";
import AdminPage from "./components/serverPages/adminPage";
import SuperTournamentPage from "./components/serverPages/SuperTournamentPage";
import DeletetUser from "./components/serverPages/deleteUser";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="*" exact={true} element={<NotFoundPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/createTournament" element={<CreateTournamentPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tournament/:id" element={<TournamentPage />} />
        <Route path="/active/:id" element={<ActiveTournamentPage />} />
        <Route path="/completed/:id" element={<ActiveTournamentPage />} />
        <Route path="/500" element={<ServerError />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/createAdminTournament"
          element={<SuperTournamentPage />}
        />
        <Route path="/deleteUser" element={<DeletetUser />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
