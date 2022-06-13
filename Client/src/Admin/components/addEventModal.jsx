import { Fragment, useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import { Dialog, Transition } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/outline";
import axios from "axios";
export default function Foo({ isOpen, onClose }) {
  const [eventName, setEventName] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [location, setLocation] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [favourite, setFavourite] = useState(false);
  const [organizers, setOrganizers] = useState([]);

  const onSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/api/addevent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventName,
        start,
        end,
        location,
        organizer,
        favourite,
      }),
    });
    if (!eventName || !start || !end) {
      alert("Enter all info");
    } else {
      onClose();
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/organizers")
      .then((response) => {
        setOrganizers(response.data);
      })
      .catch(() => {
        console.log("ERROR");
      });
  }, []);

  const [open, setOpen] = useState(true);

  const handleOrgChange = (e) => {
    setOrganizer(e.target.value);
    console.log(organizer);
  };

  const cancelButtonRef = useRef(null);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="justify-self-center mt-40"
    >
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <PlusCircleIcon
                          className="h-6 w-6 text-blue-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-2xl leading-6 font-medium text-gray-900"
                        >
                          Add Event
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            To add the event, enter all required info <br />
                            Required fields are marked by a{" "}
                            <span className="text-red-600 text-xl">*</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <form onSubmit={onSubmit} encType="multipart/form-data">
                      <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                          <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-6 ">
                              <label>
                                Event Name{" "}
                                <span className="text-red-600 text-xl">* </span>
                              </label>
                              <input
                                type="text"
                                name="eventName"
                                placeholder="Enter the event Name"
                                onChange={(e) => setEventName(e.target.value)}
                                className="shadow-md px-2 pt-2 pb-2 mb-4"
                              />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                              <label className="m-2 p-2">
                                Start Date{" "}
                                <span className="text-red-600 text-xl">* </span>
                              </label>
                              <Datetime
                                value={start}
                                name="start"
                                onChange={(date) => setStart(date)}
                                className="m-2 p-2 text-indigo-800"
                              ></Datetime>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                              <label className="p-2 m-2">
                                End Date{" "}
                                <span className="text-red-600 text-xl">* </span>
                              </label>
                              <Datetime
                                value={end}
                                name="end"
                                onChange={(date) => setEnd(date)}
                                className="p-2 m-2 text-orange-800"
                              ></Datetime>
                            </div>

                            <div className="col-span-6 sm:col-span-6">
                              <label className="p-2 m-2">Location</label>
                              <input
                                type="text"
                                name="location"
                                placeholder="Where is the event taking place"
                                onChange={(e) => setLocation(e.target.value)}
                                className="shadow-md px-2 pt-2 pb-2 mb-4"
                              ></input>
                            </div>

                            <div className="col-span-6 sm:col-span-5">
                              <label className="p-2 m-2">Organizer</label>
                              <select
                                name="organizer"
                                value={organizer.name}
                                className="absolute z-10 mt-1 w-40 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                                onChange={handleOrgChange}
                              >
                                {organizers.map((organizer) => (
                                  <option
                                    key={organizer._id}
                                    className="cursor-default select-none relative py-2 pl-3 pr-9"
                                    value={organizer.name}
                                  >
                                    {organizer.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="col-span-6 sm:col-span-6 lg:col-span-4">
                              <label className="p-2 m-2">
                                Among Favourites
                              </label>
                              <input
                                type={"checkbox"}
                                className="p-2 m-2 checked:accent-pink-500"
                                checked={favourite}
                                onChange={() => {
                                  setFavourite(!favourite);
                                }}
                              ></input>
                            </div>
                          </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-center sm:px-6">
                          <button
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            type="submit"
                          >
                            Add Event
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/*}
      <form onSubmit={onSubmit} className="text-center">
        <label>Event Name </label>
        <input
          type="text"
          name="eventName"
          placeholder="Enter the event Name"
          onChange={(e) => setEventName(e.target.value)}
          className="shadow-md px-2 pt-2 pb-2 mb-4"
        />
        <br />
        <div className="flex justify-center m-2 p-2">
          <label className="m-2 p-2">Start Date </label>
          <Datetime
            value={start}
            name="start"
            onChange={(date) => setStart(date)}
            className="m-2 p-2 text-indigo-800"
          ></Datetime>
        </div>
        <div className="flex justify-center">
          <label className="p-2 m-2">End Date</label>
          <Datetime
            value={end}
            name="end"
            onChange={(date) => setEnd(date)}
            className="p-2 m-2 text-orange-800"
          ></Datetime>
        </div>
        <div className="flex justify-center">
          <label className="p-2 m-2">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Where is the event taking place"
            onChange={(e) => setLocation(e.target.value)}
            className="shadow-md px-2 pt-2 pb-2 mb-4"
          ></input>
        </div>
        <div className="flex justify-center">
          <label className="p-2 m-2">Organizer</label>
          <input
            type="text"
            name="organizer"
            placeholder="Who is organizing the event"
            onChange={(e) => setOrganizer(e.target.value)}
            className="shadow-md px-2 pt-2 pb-2 mb-4"
          ></input>
        </div>
        <div className="flex justify-center">
          <label className="p-2 m-2">Among Favourites</label>
          <input
            type={"checkbox"}
            className="p-2 m-2 checked:accent-pink-500"
            checked={favourite}
            onChange={() => {
              setFavourite(!favourite);
            }}
          ></input>
        </div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="submit"
        >
          Add Event
        </button>
      </form>
          {*/}
    </Modal>
  );
}
