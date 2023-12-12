const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const User = require("../models/user");
const Issue = require("../models/issue");
const Category = require("../models/category");

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
     if (!checkLogin(req.body.email, req.body.password)) {
          output.status = "authFailed";
          res.json(output);
     }

     let out = await Issue.find({ CategoryId: req.body.ID }).exec();
     output.status = "success";
     output.data = out;
     res.json(output);
});

module.exports = router;
