import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function handleSubButton(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.user) {
      window.location.href = "./calendar";
    } else {
      swal({
        title: "Error",
        icon: "error",
        text: "Please check your username and password",
        button: "Try Again",
        dangerMode: "true",
      });
    }
  }
  return (
    <div className="bg-slate-900 h-screen text-slate-800">
      <br />
      <br />
      <div className="rounded-xl bg-slate-50 w-full max-w-sm mx-auto">
        <h1 className="mt-20 pt-5 text-center text-3xl font-serif ">Log In</h1>
        <form
          method="POST"
          action="./Calendar"
          className="shadow-md px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubButton}
        >
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="email"
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
              required
              placeholder="Enter your password"
              onChange={handlePasswordChange}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 items-end"
          >
            Log in
          </button>
          {/*}
          <button
            type="button"
            className="py-2 px-3 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Forgot Password ?
  </button> */}
          <Link to="/signup">
            <button
              type="button"
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Create account
            </button>
          </Link>
          <br />
          <Link to="/" className="text-gray-700 font-semibold">
            Forgot password ?
          </Link>
        </form>
      </div>
    </div>
  );
}
export default Login;
