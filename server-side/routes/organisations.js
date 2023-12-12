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

router.post("/", (req, res) => {
     var output = {
          status: "failed",
          data: [],
     };
     if (!checkLogin(req.body.email, req.body.password)) {
          output.status = "authFailed";
          res.json(output);
     }
     let List = [];

     const getList = async () => {
          const OrgIDs = req.body.organisations;
          for (let i = 0; i < OrgIDs.length; i++) {
               const ListElt = await Organisation.findById(OrgIDs[i]);
               List.push(ListElt);
          }
     };

     getList().then(() => {
          output.status = "success";
          output.data = List;
          res.json(output);
     });
});

module.exports = router;
