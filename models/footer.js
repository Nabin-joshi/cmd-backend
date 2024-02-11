const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema({
  address: {
    type: String,
  },
  addressNepali: {
    type: String,
  },
  phone: {
    type: String,
  },
  phoneNepali: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  tollFreePhone: {
    type: String,
  },
  tollFreePhoneNepali: {
    type: String,
  },
  feedBackEmail: {
    type: String,
  },
});

module.exports = mongoose.model("Footer", footerSchema);
