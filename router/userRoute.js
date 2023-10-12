const express = require("express");
const mongoose = require("mongoose");
const userSchema = require("../schema/userSchema");

const userRoute = express.Router();

// database model
const UserModel = mongoose.model("user", userSchema);

userRoute.post("/", async (req, res) => {
  const data = req.body;
  const user = new UserModel(data);
  const result = await user.save();
  console.log(data);
  res.send(result);
});

module.exports = userRoute;
