import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddEventModal from "./addEventModal";
import Axios from "axios";
import swal from "sweetalert";

function AdminCalendar() {
  const [modalOpen, setModalOpen] = useState(false);
  const timeFormat = {
    hour: "numeric",
    minute: "2-digit",
    meridiem: "short",
  };
  const deleteButton = {
    text: "Delete",
    value: "delete",
    visible: true,
    confirm: true,
    closeModal: true,
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
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Upcoming Events
            </h1>
          </div>
        </header>
        <br />
        <p className="text-center text-sm">
          ⓘ For events within the same day, the calendar puts earlier events
          first. If tied, it puts longer events first. If still tied, it orders
          events by its name, alphabetically. <br />
          If you want to delete an event, you just have to click on it.
        </p>
      </div>
      <div className="grid container p-2 m-2 w-20 mx-auto ">
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
        {/*}
        <div className="flex">
          <label className="w-32 ">Favourite events</label>
          <input
            className=""
            type="checkbox"
            name="favourite"
            onChange={() => {
              setSelectedFav(!selectedFav);
              console.log(selectedFav);
            }}
            checked={!selectedFav}
          />
          </div>{*/}
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
          eventClick={(info) => {
            swal({
              title: "Event info",
              text:
                "The event you clicked is " +
                info.event.title +
                ", it is taking place on " +
                info.event.start +
                " and ending on " +
                info.event.end,
              icon: "info",
              buttons: {
                cancel: true,
                deleteButton,
              },
              timer: 10000,
            }).then((value) => {
              switch (value) {
                case "delete":
                  swal({
                    title: "Are you sure ?",
                    icon: "warning",
                    dangerMode: true,
                    buttons: true,
                  }).then((willDelete) => {
                    if (willDelete) {
                      Axios.delete(
                        `http://localhost:5000/api/deleteevent/${info.event.id}`
                      );
                      swal("Poof! Your event has been deleted!", {
                        icon: "success",
                      });
                    } else {
                      swal("Your event is safe!");
                    }
                  });
                  break;
                default:
                  swal("Your event is safe!");
              }
            });
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

export default AdminCalendar;
