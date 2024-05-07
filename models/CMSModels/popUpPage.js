const mongoose = require("mongoose");

const PopupPageSchema = new mongoose.Schema({
  locale: String,
  heading: String,
  content: String,
  showPopup: String,
});

module.exports = mongoose.model("PopupPage", PopupPageSchema);
