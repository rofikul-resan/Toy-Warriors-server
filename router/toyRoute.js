const express = require("express");
const mongoose = require("mongoose");
const toySchema = require("../schema/toySchema");

const toyRoute = express.Router();

// database model
const ToyModel = mongoose.model("toy", toySchema);

toyRoute.post("/", async (req, res) => {
  const data = req.body;
  const user = new ToyModel(data);
  const result = await user.save();
  console.log(data);
  res.send(result);
});

module.exports = toyRoute;
