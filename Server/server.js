const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const moment = require("moment");
const cors = require("cors");
const User = require("./Models/user.model.js");
const Event = require("./Models/event.model");
const Organizer = require("./Models/organizer.model");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

// Connection to Database

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => console.log("connected to mongoDB")
);

// Sign up Backend

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    // Could use req.body instead of these 3 lines
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Email already existing" });
  }
});

// Login Backend

app.post("/api/login", async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    return res.json({ status: "ok", user: true });
  } else {
    res.json({ status: "error", user: false });
  }
});

// EVENTS CRUD----------------------------------------------

// Add Event

app.post("/api/addevent", async (req, res) => {
  console.log(req.body);
  try {
    await Event.create({
      eventName: req.body.eventName,
      start: req.body.start,
      end: req.body.end,
      location: req.body.location,
      organizer: req.body.organizer,
      favourite: req.body.favourite,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({
      status: "error",
      error: "An error occured while adding your event",
    });
  }
});

// Delete All Events

app.delete("/api/delete-all", async (req, res) => {
  try {
    Event.deleteMany({}).then(() => {
      console.log("deleted events");
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: "error",
      error: "An error occured while deleting all events",
    });
  }
});

// Display Events

app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find({});
    res.send(events);
  } catch (err) {
    res.send(err);
  }
});

app.get("/api/favevents", async (req, res) => {
  try {
    const events = await Event.find({ favourite: true });
    res.send(events);
  } catch (err) {
    res.send(err);
  }
});

app.delete("/api/delete/:_id", async (req, res) => {
  const id = req.params.id;
  await Event.findByIdAndDelete(id).exec();
  res.send("Event deleted");
});

app.get("/api/event/:_id", async (req, res) => {
  const id = req.params.id;
  const ev = await Event.findOne({ _id: id });
  res.send(ev);
});

app.post("/api/addorganizer", async (req, res) => {
  console.log(req.body);
  try {
    await Organizer.create({
      name: req.body.name,
      abbrev: req.body.abbrev,
      founder: req.body.founder,
      location: req.body.location,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({
      status: "error",
      error: "An error occured while adding the organizer",
    });
  }
});

app.listen(5000, () => console.log("Server started"));
