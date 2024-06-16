const mongoose = require("mongoose");

const volenteer = new mongoose.Schema({
  content: String,
  name: String,
});

const volenteerData = new mongoose.Schema({
  locale: String,
  volenteer: [volenteer],
});

const Volenteer = mongoose.model("Voleenter", volenteerData);

module.exports = Volenteer;
