import { useState } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
export default function Foo({ isOpen, onClose }) {
  const [eventName, setEventName] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [location, setLocation] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [favourite, setFavourite] = useState(false);

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
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="justify-self-center mt-40"
    >
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
    </Modal>
  );
}
