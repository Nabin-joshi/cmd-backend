const mongoose = require("mongoose");

const ourValues = new mongoose.Schema({
  locale: String,
  heading: String,
  values: [
    {
      image: String,
      title: String,
    },
  ],
});

const OurValues = mongoose.model("AboutUsOurValues", ourValues);

module.exports = OurValues;
