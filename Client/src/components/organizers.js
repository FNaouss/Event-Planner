import Axios from "axios";
import React, { useEffect, useState } from "react";

function Organizers() {
  const products = [
    {
      id: 1,
      name: "Earthen Bottle",
      href: "#",
      price: "$48",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
      imageAlt:
        "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    },
    {
      id: 2,
      name: "Nomad Tumbler",
      href: "#",
      price: "$35",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
      imageAlt:
        "Olive drab green insulated bottle with flared screw lid and flat top.",
    },
    {
      id: 3,
      name: "Focus Paper Refill",
      href: "#",
      price: "$89",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
      imageAlt:
        "Person using a pen to cross a task off a productivity paper card.",
    },
    {
      id: 4,
      name: "Machined Mechanical Pencil",
      href: "#",
      price: "$35",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
      imageAlt:
        "Hand holding black machined steel mechanical pencil with brass tip and top.",
    },
  ];

  const [organizers, setOrganizers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [founder, setFounder] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/addorganizer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        founder,
        country,
        city,
        address,
      }),
    });
    console.log();
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

  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Organizers</h1>
        </div>
      </header>

      <main>
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0"></div>
            </div>
            <div className="mt-5 ">
              <form onSubmit={handleSubmit}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
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
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-3 sm:px-0">
            <div>
              <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {organizers.map((organizer) => (
                    <a key={organizer._id} className="group">
                      <h3 className="mt-4 text-sm text-gray-700">
                        {organizer.name}
                      </h3>
                      <p className="mt-1 text-lg font-medium text-gray-900">
                        {organizer.city}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default Organizers;
