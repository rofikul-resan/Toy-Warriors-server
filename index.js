const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./router/userRoute");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const toyRoute = require("./router/toyRoute");

//middleware
app.use(cors());
app.use(express.json());

// database connecting
mongoose
  .connect(`${process.env.DB_URL}/toy-warrior`)
  .then(() => {
    console.log("db connect");
  })
  .catch((err) => console.log("error from db", err));

app.get("/", (req, res) => {
  res.send("server is running");
});

app.post("/jwt", async (req, res) => {
  const userData = req.body;
  const privetKey = process.env.JWT_secure;
  const token = jwt.sign(userData, privetKey, { expiresIn: "1h" });
  console.log(token);
  res.send({ token });
});

app.use("/user", userRoute);
app.use("/toy", toyRoute);

const errHandler = (err, req, res, next) => {
  console.log(err);
  return next(err.massage);
};

app.use(errHandler);
app.listen(port, () => {
  console.log(`server run in ${port}`);
});
