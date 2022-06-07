import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/nav";
import Login from "./components/login";
import Home from "./components/Home";
import Calendar from "./components/Calendar";
import Modal from "react-modal";
import Signup from "./components/signup";
import Favourite from "./components/favourites";
import Organizers from "./components/organizers";

Modal.setAppElement("#root");
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/Calendar" element={<Calendar />}></Route>
          <Route exact path="/organizers" element={<Organizers />}></Route>
          <Route exact path="/favourites" element={<Favourite />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
