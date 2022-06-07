import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddEventModal from "./addEventModal";
import Axios from "axios";
import swal from "sweetalert";

function Calendar() {
  const [modalOpen, setModalOpen] = useState(false);
  const timeFormat = {
    hour: "numeric",
    minute: "2-digit",
    meridiem: "short",
  };
  const onSubClear = () => {
    Axios.delete("http://localhost:5000/api/delete-all");
  };

  const [events, setEvents] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/api/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch(() => {
        console.log("ERROR");
      });
  }, []);

  async function handleEventAdd(data) {
    await Axios.post("/api/addevent", data.event);
  }

  return (
    <section>
      <div>
        <br />
        <p className="text-center text-sm">
          ⓘ For events within the same day, the calendar puts earlier events
          first. If tied, it puts longer events first. If still tied, it orders
          events by its name, alphabetically.
        </p>
      </div>
      <div className="grid container p-2 m-2 w-10 mx-auto ">
        <button
          className="text-white bg-gradient-to-br bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 w-32"
          onClick={() => setModalOpen(true)}
        >
          Add Event
        </button>
        <br />
        <button
          onClick={onSubClear}
          className="text-white bg-gradient-to-br bg-red-700 focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-xs px-5 py-2.5 text-center mt-2 w-32"
        >
          Reset Calendar
        </button>
      </div>
      <div className="relative z-0 mr-7 ml-7">
        <FullCalendar
          plugins={[daygridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          eventAdd={(event) => handleEventAdd(event)}
          events={events}
          eventColor="slate"
          eventDisplay="block"
          displayEventEnd="true"
          selectable="true"
          eventTimeFormat={timeFormat}
          eventBorderColor="gray"
          eventDataTransform={function (eventData) {
            return {
              id: eventData._id,
              title: eventData.eventName,
              start: eventData.start,
              end: eventData.end,
            };
          }}
          eventClick={function (info) {
            swal(
              "The event you clicked is " +
                info.event.title +
                "\n It is taking place on " +
                info.event.start +
                " and ending on " +
                info.event.end
            );
            info.el.style.borderColor = "red";
          }}
        />
      </div>
      <div>
        <br />
      </div>
      <AddEventModal
        className="max-w-xs"
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}

export default Calendar;
