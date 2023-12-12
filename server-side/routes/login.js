const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const User = require("../models/user");

let router = express.Router();
router.use(bodyParser.json());
router.use(cors());

router.get("/", async (req, res) => {
     const docs = await User.find({});
     res.json(docs);
});

router.post("/", async (req, res) => {
     console.log( 'request recieved');
     const EMAIL = req.body.email;
     const PASSWORD = req.body.password;
     //   find users with the entered email in database
     let output = await User.findOne({ email: EMAIL }).exec();
     const userObject = {
          _id: "",
          name: "",
          password: "",
          email: "",
          __v: "",
          status: "",
          organisations: [],
          messages: 0,
     };
     if (output === null) {
          userObject.status = "notFound";
     } else {
          if (output.password === PASSWORD) {
               userObject.status = "matched";
               userObject.name = output.name;
               userObject.password = output.password;
               userObject.email = output.email;
               userObject.organisations = output.organisations;
               userObject.messages = output.messages;
               userObject._id = output._id;
               userObject.__v = output.__v;
          } else {
               userObject.status = "notMatched";
          }
     }
     res.json(userObject);
});

module.exports = router;
