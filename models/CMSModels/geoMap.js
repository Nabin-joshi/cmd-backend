const mongoose = require("mongoose");

const Province = new mongoose.Schema({
  provinceName: String,
  office: String,
});

const geoMapSchema = new mongoose.Schema({
  locale: String,
  map: [Province],
});

const GeoMap = mongoose.model("GeoMap", geoMapSchema);

module.exports = GeoMap;