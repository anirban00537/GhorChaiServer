const express = require("express");
const {
  postOwnerHome,
  getOwnerHome,
  deleteHome,
  currentlyRentingInfo,
} = require("../controllers/OwnerHome");

const router = express.Router();
router.get("/:id", getOwnerHome);
router.delete("/:id", deleteHome);
router.post("/", postOwnerHome);
router.get("/renting/:currentlyRenting", currentlyRentingInfo);

module.exports = router;
