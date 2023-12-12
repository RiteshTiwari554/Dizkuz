const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const User = require("../models/user");

let router = express.Router();
router.use(bodyParser.json());
router.use(cors());

router.post("/", async (req, res) => {
     const EMAIL = req.body.email;
     let output = await User.findOne({ email: EMAIL }).exec();
     if (output === null) {
          let user = new User();
          user.name = req.body.name;
          user.password = req.body.password;
          user.email = req.body.email;
          const doc = await user.save();
          res.json(doc);
     } else {
          res.json(null);
     }
});

router.get("/", async (req, res) => {
     const docs = await User.find({});
     res.json(docs);
});

module.exports = router;
