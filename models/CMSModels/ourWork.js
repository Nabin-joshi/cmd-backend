const mongoose = require("mongoose");

const workSchema = new mongoose.Schema({
  image: String,
  header: String,
  details: String,
});

const ourWorkSchema = new mongoose.Schema({
  description: String,
  locale: String,
  work: [workSchema],
});

const OurWork = mongoose.model("OurWork", ourWorkSchema);

module.exports = OurWork;
