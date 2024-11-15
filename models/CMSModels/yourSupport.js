const mongoose = require("mongoose");

const YourSupportSchema = new mongoose.Schema({
  locale: String,
  header: String,
  details: String,
  description: String,
  quotation: String,
  quotationBy: String,
});

module.exports = mongoose.model("YourSupport", YourSupportSchema);
