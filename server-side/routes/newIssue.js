const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const User = require("../models/user");
const Organisation = require("../models/organisation");
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
     const issueName = req.body.NAME;
     const UserName = req.body.name;
     const CATID = req.body.ID;
     const DESCRIPT = req.body.DESCRIPTION;
     var today = new Date();
     var dd = String(today.getDate()).padStart(2, "0");
     var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
     var yyyy = today.getFullYear();

     today = mm + "/" + dd + "/" + yyyy;

     let output = {
          status: "Failed",
          data: {},
     };

     if (!checkLogin(req.body.email, req.body.password)) {
          output.status = "authFailed";
          res.json(output);
     }

     let out = await Issue.findOne({ title: issueName });

     if (out == null) {
          try {
               let issue = new Issue();
               issue.author = UserName;
               issue.title = issueName;
               issue.body = DESCRIPT;
               issue.creationDate = today;
               issue.CategoryId = CATID;
               const doc = await issue.save();
               const out = {
                    status: "success",
                    data: doc,
               };
               res.json(out);
          } catch (error) {
               res.json(error);
          }
     } else {
          res.json(null);
     }
});

router.get("/", async (req, res) => {
     const docs = await Issue.find({});
     res.json(docs);
});

module.exports = router;
