const mongoose = require("mongoose");

const OrganizerSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    abbrev: { type: String, required: false },
    founder: { type: String, required: true },
    location: { type: String, required: true },
  },
  { collection: "Organizers" }
);

const Organizer = mongoose.model("OrganizerData", OrganizerSchema);

module.exports = Organizer;
