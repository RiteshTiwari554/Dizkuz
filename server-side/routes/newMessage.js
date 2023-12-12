const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const User = require("../models/user");
const Organisation = require("../models/organisation");
const Issue = require("../models/issue");
const Message = require("../models/message");

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
     const AuthName = req.body.name;
     const AuthId = req.body.User_id;
     const messageBody = req.body.body;
     const issueId = req.body.IssueID;
     var todayDate = new Date().toLocaleDateString();
     var todayTime = new Date().toLocaleTimeString();
     var DT = todayDate + " " + todayTime;

     let output = {
          status: "Failed",
          data: {},
     };

     if (!checkLogin(req.body.email, req.body.password)) {
          output.status = "authFailed";
          res.json(output);
     }

     try {
          let message = new Message();
          message.author = AuthName;
          message.text = messageBody;
          message.dateTime = DT;
          message.authorID = AuthId;
          message.IssueID = issueId;
          message.userAuth = false;
          const doc = await message.save();
          const out = {
               status: "success",
               data: doc,
          };
          res.json(out);
     } catch (error) {
          res.json(error);
     }
});

router.get("/", async (req, res) => {
     const docs = await Issue.find({});
     res.json(docs);
});

module.exports = router;
