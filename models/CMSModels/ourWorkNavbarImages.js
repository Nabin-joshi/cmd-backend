const mongoose = require("mongoose");

const ourWorkNavBarImages = new mongoose.Schema({
  locale: String,
  advocacyAwarness: String,
  empowerment: String,
  support: String,
  orgDevelopment: String,
  ecsc: String,
});

const ourWorkNavbar = mongoose.model(
  "ourWorkNavBarImages",
  ourWorkNavBarImages
);

module.exports = ourWorkNavbar;
