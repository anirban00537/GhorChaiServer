const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  nid: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
