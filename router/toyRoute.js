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

toyRoute.get("/get-toy/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const result = await ToyModel.findById(id);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

toyRoute.get("/my-toy", async (req, res) => {
  const queryEmail = req.query.email;
  try {
    console.log(queryEmail);
    const result = await ToyModel.find({ "seller.email": queryEmail });
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.end();
  }
});

toyRoute.get("/category", async (req, res) => {
  const categoryKey = req.query.kay;
  const result = await ToyModel.find({ category: categoryKey }).limit(6);
  res.send(result);
});

toyRoute.post("/", async (req, res) => {
  const data = req.body;
  try {
    const user = new ToyModel(data);
    const result = await user.save();
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

module.exports = toyRoute;
