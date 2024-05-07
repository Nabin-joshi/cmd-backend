const mongoose = require("mongoose");

const faq = new mongoose.Schema({
  locale: String,
  content: String,
});

const FAQ = mongoose.model("FAQ", faq);

module.exports = FAQ;
