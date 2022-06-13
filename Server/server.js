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
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { rmSync } = require("fs");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../Client/public");
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

app.post(
  "/api/register",
  asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("Email existing");
    }

    const salt = await bcrypt.genSalt();
    const hashedPW = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPW,
    });

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      throw new Error("Couldn't add the user");
    }
  })
);
/*
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      res.status(401);
      console.log(err);
      throw new Error("Invalid Token");
    }
  }
  if (!token) {
    throw new Error("No token");
    res.status(401);
  }
});
*/
// Login Backend

app.post(
  "/api/login",
  asyncHandler(async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (user) {
      const token = jwt.sign({ email: user.email }, "secret");
      return res.json({
        status: "ok",
        user: token,
      });
    } else {
      res.json({ status: "error", user: false });
    }
  })
);

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

// Display Favourite Events

app.get("/api/favevents", async (req, res) => {
  try {
    const events = await Event.find({ favourite: true });
    res.send(events);
  } catch (err) {
    res.send(err);
  }
});

app.delete("/api/deleteevent/:id", async (req, res) => {
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
  try {
    const organizers = await Organizer.find({});
    res.send(organizers);
  } catch (err) {
    res.send(err);
  }
});

app.delete(`/api/deleteorganizer/:id`, async (req, res) => {
  const id = req.params.id;
  await Organizer.findByIdAndRemove(id).exec();
  res.send("Organizer Deleted");
});

app.get("/api/organizer/:id", async (req, res) => {});

app.put("/api/editorganizer/:id", async (req, res) => {
  const id = req.body.id;
  const organizerToUpdate = await Organizer.findById(id);
  organizerToUpdate.name = req.body.newName;
  organizerToUpdate.founder = req.body.newFounder;
  organizerToUpdate.email = req.body.newEmail;
  organizerToUpdate.country = req.body.newCountry;
  organizerToUpdate.city = req.body.newCity;
  organizerToUpdate.address = req.body.newAddress;

  organizerToUpdate.save();
  res.send("organizer updated");
});

app.listen(5000, () => console.log("Server started"));
