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
      date: {
        type: String,
        default: () => new Date().toISOString().split("T")[0],
      },
      by: { type: String, default: "" },
    },
  ],
});

const LatestNews = mongoose.model("latestNews", latestNews);

module.exports = LatestNews;
