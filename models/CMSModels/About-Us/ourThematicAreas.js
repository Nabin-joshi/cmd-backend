const mongoose = require("mongoose");

const ourThematicAreas = new mongoose.Schema({
  locale: String,
  heading: String,
  thematicAreas: [
    {
      image: String,
      title: String,
      description: String,
    },
  ],
});

const OurThematicAreas = mongoose.model("ourThematicAreas", ourThematicAreas);

module.exports = OurThematicAreas;
