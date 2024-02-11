const mongoose = require("mongoose");

const storiesSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  headingNepali: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  descNepali: {
    type: String,
  },
  person: {
    type: String,
    required: true,
  },
  personNepali: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Stories", storiesSchema);
