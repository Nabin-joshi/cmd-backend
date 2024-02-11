const mongoose = require("mongoose");

const ourValuesSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  headingNepali: {
    type: String,
  },
  icon: {
    type: String,
  },
  title: {
    type: String,
  },
  titleNepali: {
    type: String,
  },
});

module.exports = mongoose.model("OurValues", ourValuesSchema);
