const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users.js");
const { getUserInfo, getAllUser } = require("../controllers/UserInfo.js");
const JWT_SECRET = "abjflhbasldfbajlhdbffvfkjasnfdkjanfdkjnsa";

const router = express.Router();
router.get("/getuser/:id", getUserInfo);
router.get("/getallusers", getAllUser);

router.post("/signup", (req, res) => {
  const {
    name,
    email,
    password,
    role,
    address,
    nid,
    phone,
    sex,
    photo,
  } = req.body;

  if (
    !email ||
    !name ||
    !password ||
    !role ||
    !address ||
    !nid ||
    !phone ||
    !sex
  ) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  User.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res
          .status(422)
          .json({ error: "user with that name already exist" });
      }

      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          email: email,
          name: name,
          password: hashedpassword,
          role: role,
          address: address,
          nid: nid,
          phone: phone,
          sex: sex,
          photo: photo,
        });

        user
          .save()
          .then((user) => {
            res.json({ message: "saved successfuly" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//signin route
router.post("/signin", (req, res) => {
  // destructuring email and password from user for further varification
  const { email, password } = req.body;
  console.log(email, password);

  //varifying is there any input or not
  if (!email || !password) {
    return res.status(400).json({ error: "please add email and password" });
  }
  // if the there is a proper input then this part execute
  //finding there is any user using this email or not
  User.findOne({ email: email }).then((savedUser) => {
    //if there is no user using this name then send a response with an error message
    if (!savedUser) {
      res.status(422).json({ error: "invalid email and passweord" });
    }
    //if the user exist then this part of code execute
    //if the user exist then comparing the users password using bcrypt for the password validation
    //else
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        //if password matches then return a json web token for further validation
        if (doMatch) {
          // res.json({ message: "successfuly signedin" });
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const {
            name,
            _id,
            email,
            role,
            address,
            nid,
            phone,
            sex,
          } = savedUser;

          res.json({
            token: token,
            user: { _id, name, email, role, address, nid, phone, sex },
          });
        } else {
          return res.status(422).json({ error: "invalid email and password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
module.exports = router;
