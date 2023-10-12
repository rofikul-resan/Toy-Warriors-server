const { Schema } = require("mongoose");

const userSchema = new Schema({
  name: String,
  email: String,
  photoURL: String,
});

module.exports = userSchema;
