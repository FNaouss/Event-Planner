const mongoose = require("mongoose");

const EventSchema = mongoose.Schema(
  {
    eventName: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    location: { type: String },
    organizer: { type: String },
    favourite: { type: Boolean },
  },
  { collection: "Events" }
);

const Event = mongoose.model("EventData", EventSchema);

module.exports = Event;
