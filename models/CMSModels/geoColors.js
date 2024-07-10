const { string } = require("joi");
const mongoose = require("mongoose");

const geoColors = new mongoose.Schema({
  locale: String,
  geocolor: [
    {
      color: String,
    },
  ],
});

const GeoCOlors = mongoose.model("GeoCOlors", geoColors);

module.exports = GeoCOlors;
