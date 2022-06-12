import React, { useState } from "react";
import swal from "sweetalert";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  async function handleSubButton(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await response.json();
      if (data) {
        window.location.href = "./login";
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-slate-900 h-screen text-slate-800">
      <br />
      <br />
      <div className="rounded-xl bg-slate-50 w-full max-w-sm mx-auto">
        <br />
        <h1 className="mt-8 text-center text-3xl font-serif">Sign up</h1>
        <form
          action="/"
          method="POST"
          className="shadow-md px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              id="name"
              required
              placeholder="Enter your name"
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter your email"
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              id="password"
              required
              placeholder="Enter your password"
              onChange={handlePasswordChange}
            />
          </div>
          <button
            type="submit"
            name="subbutton"
            id="subbutton"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleSubButton}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
export default Signup;
