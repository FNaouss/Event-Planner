import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./nav";
import Login from "./login";
import Home from "./Home";
import Modal from "react-modal";
import Signup from "./signup";
import AdminCalendar from "./Admin/components/Calendar";
import AdminFavourite from "./Admin/components/favourites";
import AdminOrganizers from "./Admin/components/organizers";

Modal.setAppElement("#root");
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/calendar" element={<AdminCalendar />}></Route>
          <Route path="/favourites" element={<AdminFavourite />}></Route>
          <Route path="/Organizers" element={<AdminOrganizers />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
