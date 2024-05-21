const mongoose = require("mongoose");

const needHelp = new mongoose.Schema({
  locale: String,
  content: String,
});

const NeedHelp = mongoose.model("NeedHelp", needHelp);

module.exports = NeedHelp;
