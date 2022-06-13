import React from "react";
import { Link } from "react-router-dom";
import LogoSS from "./logo";
const Nav = () => {
  let Links = [
    { name: "Home", link: "/" },
    { name: "Events", link: "./calendar" },
    { name: "Events Organizers", link: "./organizers" },
    { name: "Favourite Events", link: "./favourites" },
    { name: "Log Out", link: "./logout" },
  ];
  return (
    <div className="shadow-md w-full relative top-0 left-0">
      <div className="md:flex items-center justify-between bg-teal-300 py-2 md:px-10 px-7 h-24">
        <div className="font-bold text-2x1 cursor-pointer flex items-center font-[Poppins] text-gray-800">
          <Link to="/" className="hover:text-gray-400 flex">
            <LogoSS />
          </Link>
        </div>
        <ul className="md:flex md:items-center">
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl">
              <Link
                to={link.link}
                className="nav-link text-gray-800 hover:text-gray-400 duration-500"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
