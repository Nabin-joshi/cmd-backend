const mongoose = require("mongoose");

const getInvolvedNavbarImages = new mongoose.Schema({
  locale: String,
  procurement: String,
  vacancy: String,
  volunteer: String,
  donate: String,
});

const getInvolvedNavbar = mongoose.model(
  "getInvolvedNavbarImages",
  getInvolvedNavbarImages
);

module.exports = getInvolvedNavbar;
