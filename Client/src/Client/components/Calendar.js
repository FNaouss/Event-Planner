import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Axios from "axios";
import swal from "sweetalert";

function Calendar() {
  const timeFormat = {
    hour: "numeric",
    minute: "2-digit",
    meridiem: "short",
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
    </section>
  );
}

export default Calendar;
