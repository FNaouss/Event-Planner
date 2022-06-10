const mongoose = require("mongoose");

const OrganizerSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    founder: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: false },
    logo: { type: String, required: true },
  },
  { collection: "Organizers" }
);

const Organizer = mongoose.model("OrganizerData", OrganizerSchema);

module.exports = Organizer;
