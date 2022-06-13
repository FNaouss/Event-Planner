import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import swal from "sweetalert";
import Axios from "axios";

function AdminFavourite() {
  const onSubClear = () => {
    Axios.delete("http://localhost:5000/api/delete-all-fav");
  };

  const [events, setEvents] = useState([]);
  const timeFormat = {
    hour: "numeric",
    minute: "2-digit",
    meridiem: "short",
  };
  useEffect(() => {
    Axios.get("http://localhost:5000/api/favevents")
      .then((response) => {
        setEvents(response.data);
      })
      .catch(() => {
        console.log("Error while fetching favourite events");
      });
  }, []);

  return (
    <section>
      <div>
        <br />
        <p className="text-center text-sm">
          ⓘ For events within the same day, the calendar puts earlier events
          first. If tied, it puts longer events first. If still tied. If still
          tied, orders events by title, alphabetically.
        </p>
      </div>
      <div className="grid container p-2 m-2 w-10 mx-auto ">
        <br />
        <button
          onClick={onSubClear}
          className="text-white bg-gradient-to-br bg-red-700 focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-xs px-5 py-2.5 text-center mt-2 w-32"
        >
          Reset Favourite Calendar
        </button>
      </div>
      <div className="relative z-0 mr-7 ml-7">
        <FullCalendar
          plugins={[daygridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
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
          eventClick={(info) => {
            swal({
              title: "Are you sure ?",
              text:
                "The event you clicked is " +
                info.event.title +
                ", it is taking place on " +
                info.event.start +
                " and ending on " +
                info.event.end,
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then((willDelete) => {
              if (willDelete) {
                swal("Poof! Your event has been deleted!", {
                  icon: "success",
                });
                Axios.delete(
                  `http://localhost:5000/api/deleteevent/${info.event.id}`
                );
              } else {
                swal("Your event is safe!");
              }
            });
          }}
        />
      </div>
      <div>
        <br />
      </div>
    </section>
  );
}

export default AdminFavourite;
