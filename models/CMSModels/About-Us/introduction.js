const mongoose = require("mongoose");

const aboutUsIntroduction = new mongoose.Schema({
  locale: String,
  introductionTitle: String,
  introductionDescription: String,
  ourVisionTitle: String,
  ourVisionDescription: String,
  ourMissionTitle: String,
  ourMissionDescription: String,
  ourGoalTitle: String,
  ourGoalDescription: String,
  imageTitle: String,
  image: String,
});

const AboutUsIntroduction = mongoose.model(
  "aboutUsIntroduction",
  aboutUsIntroduction
);

module.exports = AboutUsIntroduction;
