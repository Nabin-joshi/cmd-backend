const mongoose = require("mongoose");

const mentalHealth = new mongoose.Schema({
  locale: String,
  content: String,
});

const MentalHealth = mongoose.model("mentalHealth", mentalHealth);

module.exports = MentalHealth;