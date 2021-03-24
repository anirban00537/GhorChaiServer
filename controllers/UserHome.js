const { Mongoose } = require("mongoose");
const HomeModel = require("../models/HouseModel.js");

exports.getUserHome = getUserHome = async (req, res) => {
  const home = await HomeModel.find().sort({ _id: -1 });
  res.json(home);
};
exports.userrentedhouse = userrentedhouse = async (req, res) => {
  const id = req.params.id;
  const home = await HomeModel.find({ currentlyRenting: id });
  res.json(home);
};
//yet to done
exports.complainControl = complainControl = async (req, res) => {
  const { id, complain } = req.body;

  const complainHome = await HomeModel.findOneAndUpdate(
    { _id: id },
    {
      $push: { complains: complain },
    },
    {
      new: true,
    }
  );
  console.log(complain);
  res.json(complainHome);
};

exports.setUserRent = setUserRent = async (req, res) => {
  const updateHome = req.body;

  if (updateHome.rent == 1) {
    const updatedHome = await HomeModel.findOneAndUpdate(
      { _id: updateHome._id },
      {
        currentlyRenting: updateHome.user_id,
        status: "true",
      },
      {
        new: true,
      }
    );
  } else {
    const updatedHome = await HomeModel.findOneAndUpdate(
      { _id: updateHome._id },
      { currentlyRenting: null, status: "false", $set: { complains: [] } },
      {
        new: true,
      }
    );
  }

  // const postMessages = await DetailsModel.findOneAndUpdate(
  //   { detailsId: 1234 },
  //   post,
  //   {
  //     new: true,
  //   }
  // );
  res.json({ message: "done" });
};

exports.searchHome = searchHome = async (req, res) => {
  const { area } = req.params;
  const homes = await HomeModel.find({
    area: { $regex: "^" + area, $options: "i" },
    currentlyRenting: null,
  });

  res.status(200).json({ homes: homes });
};
