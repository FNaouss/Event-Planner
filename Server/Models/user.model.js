const { boolean } = require("joi");
const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
  },
  { collection: "Users" }
);

const model = mongoose.model("UserData", User);

module.exports = model;
