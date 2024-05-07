const mongoose = require("mongoose");

const termsOfService = new mongoose.Schema({
  locale: String,
  content: String,
});

const TermsOfService = mongoose.model("termsOfService", termsOfService);

module.exports = TermsOfService;
