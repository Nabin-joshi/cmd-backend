const mongoose = require("mongoose");

const quicklink = new mongoose.Schema({
  locale: String,
  quicklink: [
    {
      title: String,
      href: String,
    },
  ],
});

const QuickLinks = mongoose.model("QuickLinks", quicklink);

module.exports = QuickLinks;
