const mongoose = require("mongoose");

const privacyPolicy = new mongoose.Schema({
  locale: String,
  content: String,
});

const PrivacyPolicy = mongoose.model("privacyPolicy", privacyPolicy);

module.exports = PrivacyPolicy;
