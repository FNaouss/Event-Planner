import Axios from "axios";
import React, { useEffect, useState } from "react";

function Organizers() {
  const [organizers, setOrganizers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [founder, setFounder] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [fileName, setFileName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/api/addorganizer", formdata)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    Axios.get("http://localhost:5000/api/organizers")
      .then((response) => {
        setOrganizers(response.data);
      })
      .catch(() => {
        console.log("ERROR");
      });
  }, []);

  const formdata = new FormData();
  formdata.append("name", name);
  formdata.append("logo", fileName);
  formdata.append("email", email);
  formdata.append("founder", founder);
  formdata.append("country", country);
  formdata.append("city", city);
  formdata.append("address", address);
  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Organizers</h1>
        </div>
      </header>

      <main className="bg-gray-100">
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0"></div>
            </div>
            <div className="mt-5 ">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          className="block text-sm font-medium text-gray-700"
                          htmlFor="file"
                        >
                          Logo
                        </label>
                        <input
                          name="logo"
                          type="file"
                          filename="logo"
                          onChange={(e) => {
                            setFileName(e.target.files[0]);
                          }}
                          required
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          name="name"
                          type="text"
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          required
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Founder
                        </label>
                        <input
                          name="founder"
                          type="text"
                          onChange={(e) => {
                            setFounder(e.target.value);
                          }}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <input
                          type="text"
                          name="email"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Country
                        </label>
                        <input
                          name="country"
                          type="text"
                          onChange={(e) => {
                            setCountry(e.target.value);
                          }}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          onChange={(e) => {
                            setCity(e.target.value);
                          }}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-700">
                          Street address
                        </label>
                        <input
                          type="text"
                          name="address"
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-center sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add Organizer
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="p-5 h-screen bg-gray-100">
          <table className="mx-auto">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="p-3 text-sm font-bold tracking-wide">Logo</th>
                <th className="p-3 text-sm font-bold tracking-wide">Name</th>
                <th className="p-3 text-sm font-bold tracking-wide">Founder</th>
                <th className="p-3 text-sm font-bold tracking-wide">Email</th>
                <th className="p-3 text-sm font-bold tracking-wide">Country</th>
                <th className="p-3 text-sm font-bold tracking-wide">City</th>
                <th className="p-3 text-sm font-bold tracking-wide">Address</th>
                <th className="p-3 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {organizers.map((organizer) => (
                <tr className="bg-white">
                  <td className="p-3 text-sm font-bold text-blue-500 hover:underline">
                    <img src={"../../src/images/logo.png"} />
                  </td>
                  <td className="p-3 text-sm font-bold text-blue-500 hover:underline">
                    {organizer.name}
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    {organizer.founder}
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    {organizer.email}
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    {organizer.country}
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    {organizer.city}
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    {organizer.address}
                  </td>
                  <td className="flex p-3">
                    <a href="http://localhost:5000/api/deleteorganizer?_id">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </a>
                    <a href="http://localhost:5000/api/editorganizer/?_id">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
export default Organizers;
