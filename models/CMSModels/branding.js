const mongoose = require("mongoose");

const branding = new mongoose.Schema({
  barColor: String,
  contentColor: String,
  logo: String,
});

const Branding = mongoose.model("Branding", branding);

module.exports = Branding;
