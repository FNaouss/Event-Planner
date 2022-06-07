import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-black my-20 bg-slate-900 bg-contain">
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <h1 className="text-[#ffffff] md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
          List Your Events.
        </h1>
        <div className="flex justify-center items-center">
          <p className="text-[#fff2aa] md:text-5xl sm:text-4xl text-xl font-bold py-4">
            Join events
          </p>
        </div>
        <p className="md:text-2xl text-xl font-bold text-gray-500"></p>
        <Link to="/login">
          <button className="bg-[#0f0a52] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-white hover:bg-sky-700">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
