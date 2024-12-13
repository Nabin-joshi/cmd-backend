const mongoose = require("mongoose");

const latestNews = new mongoose.Schema({
  locale: String,
  news: [
    {
      image: String,
      title: String,
      day: String,
      month: String,
      contentDescription: String,
      details: String,
      navigationLink: {
        type: String,
        default: function () {
          return this._id;
        },
        unique: true,
      },
    },
  ],
});

const LatestNews = mongoose.model("latestNews", latestNews);

module.exports = LatestNews;
