import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrashIcon,
  PencilAltIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
import swal from "sweetalert";

function AdminOrganizers() {
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

  const onEdit = (id) => {
    const newName = prompt("Enter new name\nThis field is required");
    const newFounder = prompt("Enter new founder name");
    const newEmail = prompt("Enter new email");
    const newCountry = prompt("Enter new country");
    const newCity = prompt("Enter new city");
    const newAddress = prompt("Enter new address");

    Axios.put(`http://localhost:5000/api/editorganizer/${id}`, {
      id: id,
      newName: newName,
      newFounder: newFounder,
      newEmail: newEmail,
      newCountry: newCountry,
      newCity: newCity,
      newAddress: newAddress,
    }).then(() => {
      setOrganizers(
        organizers.map((org) => {
          return org._id == id
            ? {
                _id: id,
                newName: newName,
                newFounder: newFounder,
                newEmail: newEmail,
                newCountry: newCountry,
                newCity: newCity,
                newAddress: newAddress,
              }
            : org;
        })
      );
    });

    if (!newName || !newEmail || !newCountry) {
      swal("Enter all info");
    }
  };
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
                      <div className="col-span-6 sm:col-span-6">
                        <div className="mt-1 flex items-center m-2">
                          <span className="inline-block h-12 w-14 rounded-full overflow-hidden bg-gray-100 ">
                            <svg
                              className="h-full w-full text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </span>
                          <input
                            name="logo"
                            type="file"
                            filename="logo"
                            onChange={(e) => {
                              setFileName(e.target.files[0]);
                            }}
                            required
                            className="mt-1 mx-3 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-4">
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
                <tr className="bg-white" key={organizer._id}>
                  <td className="p-3 text-sm font-bold text-blue-500 hover:underline">
                    <img src="../../images/logo.png" />
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
                    <a
                      href="#"
                      onClick={() => {
                        Axios.delete(
                          `http://localhost:5000/api/deleteorganizer/${organizer._id}`
                        );
                      }}
                    >
                      <TrashIcon className="w-6" />
                    </a>
                    <a href="#" onClick={() => onEdit(organizer._id)}>
                      <PencilAltIcon className="w-6" />
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
export default AdminOrganizers;
