const { Schema } = require("mongoose");

const toySchema = new Schema({
  name: String,
  seller: {
    name: String,
    email: String,
    photoURL: String,
  },
  photo: String,
  category: {
    type: String,
    enum: ["car", "barbie-doll", "educational", "action"],
  },
  rating: Number,
  quantity: Number,
  price: Number,
  addTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = toySchema;
