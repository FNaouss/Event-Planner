const mongoose = require("mongoose");

const OrganizerSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    founder: { type: String, required: false, default: "Someone" },
    email: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: false },
    address: { type: String, required: false },
    logo: { type: String, required: false, default: "logo3.webp" },
  },
  { collection: "Organizers" }
);

const Organizer = mongoose.model("OrganizerData", OrganizerSchema);

module.exports = Organizer;
