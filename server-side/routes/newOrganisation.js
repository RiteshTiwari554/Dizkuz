const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const User = require("../models/user");
const Organisation = require("../models/organisation");

let router = express.Router();
router.use(bodyParser.json());
router.use(cors());

const checkLogin = async (EMAIL, PASSWORD) => {
     let output = await User.findOne({ email: EMAIL }).exec();

     if (output == null) {
          return false;
     }
     if (output.password === PASSWORD) {
          return true;
     }
     return false;
};

router.post("/", async (req, res) => {
     const NAME = req.body.OrgName;
     const EMAIL = req.body.email;
     const USERS = req.body.users;
     const PASSWORD = req.body.password;
     const curr = req.body.name;
     const curr_id = req.body.User_id;

     USERS.push(curr_id);

     let output = {
          status: "Failed",
          data: {},
     };

     if (!checkLogin(req.body.email, req.body.password)) {
          output.status = "authFailed";
          res.json(output);
     }
     let org = new Organisation();
     org.name = NAME;
     org.users = USERS;
     const doc = await org.save();
     for (let i = 0; i < USERS.length; i++) {
          User.findByIdAndUpdate(USERS[i], {
               $push: { organisations: doc.id },
          }).exec();
     }

     let UserData = await User.findOne({ email: EMAIL }).exec();
     let userObject = {
          _id: "",
          name: "",
          password: "",
          email: "",
          __v: "",
          status: "",
          organisations: [],
          messages: 0,
     };
     if (UserData === null) {
          userObject.status = "Failed";
     } else {
          if (UserData.password === PASSWORD) {
               userObject.status = "Success";
               userObject.name = UserData.name;
               userObject.password = UserData.password;
               userObject.email = UserData.email;
               userObject.organisations = UserData.organisations;
               userObject.messages = UserData.messages;
               userObject._id = UserData._id;
               userObject.__v = UserData.__v;
          } else {
               userObject.status = "Failed";
          }
     }
     res.json(userObject);
});

router.get("/", async (req, res) => {
     const docs = await organisation.find({});
     res.json(docs);
});

module.exports = router;
