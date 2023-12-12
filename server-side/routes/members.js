const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
let router = express.Router();
router.use(bodyParser.json());
router.use(cors());

const User = require("../models/user");
const Organisation = require("../models/organisation");
const Category = require("../models/category");
const Issue = require("../models/issue");
const message = require("../models/message");

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
     const ORGID = req.body.ID;
     var output = {
          status: "failed",
     };
     if (!checkLogin(req.body.email, req.body.password)) {
          output.status = "authFailed";
          res.json(output);
     }
     try {
          let currOrg = await Organisation.findById(ORGID).exec();
          const MEMS = currOrg.users;
          let arr = [];
          for (let i = 0; i < MEMS.length; i++) {
               const currMem = await User.findById(MEMS[i]);
               let membr = {
                    name: currMem.name,
                    email: currMem.email,
                    _id: currMem._id,
               };
               arr.push(membr);
          }
          const out = {
               status: "success",
               data: arr,
          };
          res.json(out);
     } catch (error) {
          output.status = "failed";
          res.json(output);
     }
});

router.get("/", async (req, res) => {
     const docs = await Organisation.find({});
     res.json(docs);
});

module.exports = router;
