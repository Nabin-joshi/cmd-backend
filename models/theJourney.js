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
  color: {
    type: String,
  },
  contents: [
    {
      date: {
        type: String,
      },
      dateNepali: {
        type: String,
      },
      desc: {
        type: String,
      },
      descNepali: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("TheJourney", theJourneySchema);
