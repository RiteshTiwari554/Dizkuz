const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const User = require("../models/user");

let router = express.Router();
router.use(bodyParser.json());
router.use(cors());

router.post("/", async (req, res) => {
     const id = req.body.userID;

     let IdExists = false;
     let output = await User.findOne({ _id: id }).exec();

     if (output != null) {
          IdExists = true;
     }

     if (IdExists) {
          const out = {
               status: "Found",
          };
          res.json(out);
     } else {
          const out = {
               status: "notFound",
          };
          res.json(out);
     }
});

router.get("/", async (req, res) => {
     const docs = await User.find({});
     res.json(docs);
});

module.exports = router;
