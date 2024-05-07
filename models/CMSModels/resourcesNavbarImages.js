const mongoose = require("mongoose");

const resourcesNavbarImages = new mongoose.Schema({
  locale: String,
  procurement: String,
  vacancy: String,
  volunteer: String,
  digitalLibrary: String,
  transformingLives: String,
  blog: String,
});

const resourcesNavbar = mongoose.model(
  "resourcesNavbarImages",
  resourcesNavbarImages
);

module.exports = resourcesNavbar;
