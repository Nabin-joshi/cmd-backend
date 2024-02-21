const mongoose = require("mongoose");

const GeographicalCoverageSchema = new mongoose.Schema({
  locale: String,
  districts: String,
  RMs: String,
  PNGOs: String,
  schools: String,
});

module.exports = mongoose.model(
  "GeographicalCoverage",
  GeographicalCoverageSchema
);
