const express = require("express");
const {
  getUserHome,
  searchHome,
  setUserRent,
  userrentedhouse,
  complainControl,
} = require("../controllers/UserHome.js");

const router = express.Router();
router.get("/gethome", getUserHome);
router.get("/searchHome/:area", searchHome);
router.patch("/setrent", setUserRent);
router.patch("/complain", complainControl);
router.get("/userrentedhouse/:id", userrentedhouse);
module.exports = router;
