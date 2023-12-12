const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const User = require("../models/user");
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

router.get("/", async (req, res) => {
     const docs = await User.find({});
     res.json(docs);
});

router.post("/", async (req, res) => {
     const Name = req.body.NAME;
     const id = req.body.ID;
     var output = {
          status: "failed",
          data: [],
     };
     if (!checkLogin(req.body.email, req.body.password)) {
          output.status = "authFailed";
          res.json(output);
     }
     try {
          let out = await Category.findOne({ name: Name }).exec();
          if (out === null) {
               let category = new Category();
               category.name = Name;
               category.OrganisationId = id;
               const doc = await category.save();
               const OUT = {
                    status: "success",
                    name: Name,
                    organisationId: id,
               };
               res.json(OUT);
          } else {
               res.json(null);
          }
     } catch (error) {
          res.json(error);
     }
});

module.exports = router;
