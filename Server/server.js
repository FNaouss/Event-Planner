const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const moment = require("moment");
const cors = require("cors");
const User = require("./Models/user.model.js");
const Event = require("./Models/event.model");
const Organizer = require("./Models/organizer.model");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../Client/public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
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

app.post("/api/addevent", upload.single("logo"), async (req, res) => {
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

app.post("/api/addorganizer", upload.single("logo"), async (req, res) => {
  try {
    await Organizer.create({
      name: req.body.name,
      founder: req.body.founder,
      email: req.body.email,
      country: req.body.country,
      city: req.body.city,
      address: req.body.address,
      logo: req.file.originalname,
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

app.get("/api/organizers", async (req, res) => {
  console.log(res.body);
  try {
    const organizers = await Organizer.find({});
    res.send(organizers);
  } catch (err) {
    res.send(err);
  }
});

app.listen(5000, () => console.log("Server started"));
