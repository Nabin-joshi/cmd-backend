const mongoose = require("mongoose");

const ourImpactSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  headingNepali: {
    type: String,
  },
  contents: [
    {
      icon: {
        type: String,
      },
      count: {
        type: String,
      },
      countNepali: {
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

module.exports = mongoose.model("OurImpact", ourImpactSchema);
