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
        type: Number,
      },
      countNepali: {
        type: Number,
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
