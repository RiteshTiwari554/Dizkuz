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
     var output = {
          status: "failed",
          data: [],
     };
     const USERID = req.body.userId;
     const ORGID = req.body.organisationId;
     if (!checkLogin(req.body.email, req.body.password)) {
          output.status = "authFailed";
          res.json(output);
     }
     try {
          User.findByIdAndUpdate(USERID, {
               $pull: { organisations: ORGID },
          }).exec();
     } catch (error) {
          const status = {
               process: "Failed",
          };

          res.json(status);
     }

     try {
          Organisation.findByIdAndUpdate(ORGID, {
               $pull: { users: USERID },
          }).exec();
     } catch (error) {
          const status = {
               process: "Failed",
          };
          res.json(status);
     }
     let out = await User.findById(USERID).exec();
     const status = {
          process: "success",
          user: out,
     };
     res.json(status);
});

router.get("/", async (req, res) => {
     const docs = await Organisation.find({});
     res.json(docs);
});

module.exports = router;
