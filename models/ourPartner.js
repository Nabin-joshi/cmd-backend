const mongoose = require("mongoose");

const ourPartnerSchema = new mongoose.Schema({
  locale: String,
  heading: String,
  partner: [
    {
      image: String,
      name: String,
      content: String,
      type: { type: String, default: "Former" },
      display: {
        type: Boolean,
        default: true,
      },
    },
  ],
});

module.exports = mongoose.model("OurPartner", ourPartnerSchema);
