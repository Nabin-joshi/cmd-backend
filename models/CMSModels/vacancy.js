const mongoose = require("mongoose");

const vacancy = new mongoose.Schema({
  content: String,
  name: String,
});

const vacancyData = new mongoose.Schema({
  locale: String,
  vacancy: [vacancy],
});

const Vacancy = mongoose.model("Vacancy", vacancyData);

module.exports = Vacancy;
