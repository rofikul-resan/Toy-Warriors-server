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

// database route

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

toyRoute.get("/search", async (req, res) => {
  const searchKey = req.query.key;
  const sortKeyQuery = req.query.sortKey;
  let sortKey = 1;
  if (!isNaN(+sortKeyQuery)) {
    sortKey = +sortKeyQuery;
  }
  try {
    const result = await ToyModel.find({
      name: { $regex: searchKey, $options: "i" },
    }).sort({ price: sortKey });
    console.log(result);
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

toyRoute.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const prvData = await ToyModel.findById(id);
  const updateDoc = {
    name: data.name || prvData.name,
    details: data.details || prvData.details,
    quantity: data.quantity || prvData.quantity,
    price: data.price || prvData.price,
  };
  const result = await ToyModel.findByIdAndUpdate(id, updateDoc, { new: true });
  res.send(result);
});

module.exports = toyRoute;
