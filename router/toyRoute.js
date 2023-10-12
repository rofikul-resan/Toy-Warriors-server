const express = require("express");
const mongoose = require("mongoose");
const toySchema = require("../schema/toySchema");

const toyRoute = express.Router();

// database model
const ToyModel = mongoose.model("toy", toySchema);
toyRoute.get("/", async (req, res) => {
  const result = await ToyModel.find();
  res.send(result);
});

toyRoute.get("/category", async (req, res) => {
  const categoryKey = req.query.kay;
  const result = await ToyModel.find({ category: categoryKey }).limit(6);
  res.send(result);
});

toyRoute.post("/", async (req, res) => {
  const data = req.body;
  const user = new ToyModel(data);
  const result = await user.save();
  console.log(data);
  res.send(result);
});

module.exports = toyRoute;
