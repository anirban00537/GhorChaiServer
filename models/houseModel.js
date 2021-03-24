const mongoose = require("mongoose");

const HouseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photo: [
    {
      type: String,
      required: true,
    },
  ],
  complains: [{ name: String, complains: String }],

  price: {
    type: Number,
    required: true,
  },
  area: {
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
  homeOwner: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "homeOwner",
  },
  status: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  currentlyRenting: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "currentlyRenting",
  },
});

const House = mongoose.model("House", HouseSchema);

module.exports = House;
