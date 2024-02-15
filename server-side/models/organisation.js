const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrganisationSchema = new Schema({
  users: [String],
  name: String,
});

module.exports = mongoose.model("Organisation", OrganisationSchema);

