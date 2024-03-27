const mongoose = require("mongoose");

const getInvolvedSchema = mongoose.Schema({
  vacancy: {
    type: String,
    default: "",
  },
  vacancyNepali: {
    type: String,
    default: "",
  },
  procurement: {
    type: String,
    default: "",
  },
  procurementNepali: {
    type: String,
    default: "",
  },
  volunteer: {
    type: String,
    default: "",
  },
  volunteerNepali: {
    type: String,
    default: "",
  },
  donate: {
    type: String,
    default: "",
  },
  donateNepali: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("GetInvolved", getInvolvedSchema);
