const mongoose = require("mongoose");

const theJourneySchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  headingNepali: {
    type: String,
  },
  subHeading: {
    type: String,
  },
  subHeadingNepali: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  descNepali: {
    type: String,
  },
  color: {
    type: String,
  },
});

module.exports = mongoose.model("TheJourney", theJourneySchema);
