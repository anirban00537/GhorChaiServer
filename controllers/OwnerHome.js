const HomeModel = require("../models/HouseModel.js");
const user = require("../models/users.js");
exports.getOwnerHome = getOwnerHome = async (req, res) => {
  const { id } = req.params;
  const home = await HomeModel.find({ homeOwner: id }).sort({ _id: -1 });
  res.json(home);
};

exports.currentlyRentingInfo = currentlyRentingInfo = async (req, res) => {
  const { currentlyRenting } = req.params;
  const users = await user.findById(currentlyRenting).sort({ _id: -1 });
  console.log("calling user");
  res.json(users);
};
exports.deleteHome = deleteHome = async (req, res) => {
  const { id } = req.params;
  try {
    const home = await HomeModel.findByIdAndDelete({ _id: id });
    res.json(home._id);
  } catch (error) {
    console.log(error.message);
  }
};
exports.postOwnerHome = postOwnerHome = async (req, res) => {
  const { home, photo } = req.body;
  const {
    title,
    description,
    address,
    price,
    area,
    nid,
    phone,
    homeOwner,
    currentlyRenting,
  } = home;

  const newHouseCreate = new HomeModel({
    title: title,
    description: description,
    address: address,
    price: price,
    area: area,
    nid: nid,
    phone: phone,
    homeOwner: homeOwner,
    currentlyRenting: currentlyRenting,
    photo: photo,
    status: "false",
  });
  try {
    await newHouseCreate.save();

    res.status(201).json(newHouseCreate);
    console.log("created home");
  } catch (error) {
    res.json({ error: error.message });
  }
};
