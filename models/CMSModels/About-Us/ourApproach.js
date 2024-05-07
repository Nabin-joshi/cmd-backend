const mongoose = require("mongoose");

const ourApproach = new mongoose.Schema({
  locale: String,
  heading: String,
  approach: [
    {
      image: String,
      title: String,
    },
  ],
});

const OurApproach = mongoose.model("ourApproach", ourApproach);

module.exports = OurApproach;
