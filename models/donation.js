const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  header: {
    type: String,
    default: "",
  },
  headerNepali: {
    type: String,
    default: "",
  },
  iconDescs: [
    {
      icon: {
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
    },
  ],
  anyAmountCountHeader: {
    type: String,
    default: "",
  },
  anyAmountCountHeaderNepali: {
    type: String,
    default: "",
  },
  bankName: {
    type: String,
    default: "",
  },
  bankNameNepali: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  locationNepali: {
    type: String,
    default: "",
  },
  swiftCode: {
    type: String,
    default: "",
  },
  swiftCodeNepali: {
    type: String,
    default: "",
  },
  currency: {
    type: String,
    default: "",
  },
  currencyNepali: {
    type: String,
    default: "",
  },
  acNumber: {
    type: String,
    default: "",
  },
  acNumberNepali: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Donation", donationSchema);
