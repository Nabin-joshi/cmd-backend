const mongoose = require("mongoose");

const latestNews = new mongoose.Schema({
  locale: String,
  news: [
    {
      image: String,
      title: String,
      date: String,
      contentDescription: String,
      details: String,
    },
  ],
});

const LatestNews = mongoose.model("latestNews", latestNews);

module.exports = LatestNews;
