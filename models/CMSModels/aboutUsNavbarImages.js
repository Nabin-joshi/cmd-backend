const mongoose = require("mongoose");

const aboutusNavBarImages = new mongoose.Schema({
  locale: String,
  aboutUsHistory: String,
  aboutUsIntroduction: String,
  aboutUsOurTeam: String,
});

const aboutusNavBar = mongoose.model(
  "aboutusNavBarImages",
  aboutusNavBarImages
);

module.exports = aboutusNavBar;
