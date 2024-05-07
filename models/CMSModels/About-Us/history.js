const mongoose = require("mongoose");

const aboutUsHistory = new mongoose.Schema({
  locale: String,
  historyDescription: String,
  history: [
    {
      image: String,
      title: String,
      subTitle: String,
      description: String,
    },
  ],
});

const AboutUsHistory = mongoose.model("aboutUsHistory", aboutUsHistory);

module.exports = AboutUsHistory;
