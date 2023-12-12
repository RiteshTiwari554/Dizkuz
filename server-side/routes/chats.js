const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const User = require("../models/user");
const Organisation = require("../models/organisation");
const Message = require("../models/message");
const Issue = require("../models/issue");

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
     const issId = req.body.IssueID;
     const usrId = req.body.UserID;

     var output = {
          status: "failed",
          data: [],
     };
     if (!checkLogin(req.body.email, req.body.password)) {
          output.status = "authFailed";
          res.json(output);
     }

     try {
          let List = await Message.find({ IssueID: issId }).exec();

          let OutputList = [];

          for (let i = 0; i < List.length; i++) {
               if (List[i].authorID === usrId) {
                    const out = {
                         userAuth: true,
                         author: List[i].author,
                         text: List[i].text,
                         dateTime: List[i].dateTime,
                    };
                    OutputList.push(out);
               } else {
                    const out = {
                         userAuth: false,
                         author: List[i].author,
                         text: List[i].text,
                         dateTime: List[i].dateTime,
                    };
                    OutputList.push(out);
               }
          }

          output.status = "success";
          output.data = OutputList;
          res.json(output);
     } catch (error) {
          res.json(output);
     }
});

router.get("/", async (req, res) => {
     const docs = await Message.find({});
     res.json(docs);
});

module.exports = router;
