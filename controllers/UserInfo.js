const User = require("../models/users.js");

exports.getUserInfo = getUserInfo = async (req, res) => {
  const id = req.params.id;
  const user = await User.find({ _id: id });
  res.json(user);
};

exports.getAllUser = getAllUser = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
