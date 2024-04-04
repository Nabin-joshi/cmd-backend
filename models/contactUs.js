const mongoose = require("mongoose");

const contactUsSchema = mongoose.Schema({
  header: {
    type: String,
    default: "",
  },
  headerNepali: {
    type: String,
    default: "",
  },
  headerImage: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  descriptionNepali: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  phoneNepali: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  addressNepali: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("contactU", contactUsSchema);
