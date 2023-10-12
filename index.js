const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./router/userRoute");
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

// database connecting
mongoose
  .connect("mongodb://127.0.0.1:27017/toy-warrior")
  .then(() => {
    console.log("db connect");
  })
  .catch((err) => console.log("error from db", err));

app.get("/", (req, res) => {
  res.send("server is running");
});

app.use("/user", userRoute);

const errHandler = (err, req, res, next) => {
  console.log(err);
  return next(err.massage);
};

app.use(errHandler);
app.listen(port, () => {
  console.log(`server run in ${port}`);
});
