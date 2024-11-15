const mongoose = require("mongoose");

const ourPartnerSchema = new mongoose.Schema({
  locale: String,
  heading: String,
  partner: [
    {
      image: String,
      content: String,
      type: { type: String, default: "Former" },
    },
  ],
});

module.exports = mongoose.model("OurPartner", ourPartnerSchema);
