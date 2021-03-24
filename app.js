const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const auth = require("./routes/auth.js");
const OwnerHome = require("./routes/ownerHome.js");
const UserHome = require("./routes/UserHome.js");
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(cors());

const CONNECTION_URL =
  "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected Successfully");
    app.use("/", auth);
    app.use("/createhome", OwnerHome);

    app.use("/user", UserHome);
  })
  .catch((error) => {
    console.log(error.message);
  });

app.listen(PORT, () => {
  console.log("Server running successfully on localhost:" + PORT);
});

mongoose.set("useFindAndModify", false);
