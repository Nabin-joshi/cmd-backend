const mongoose = require("mongoose");

const ourPartnerSchema = new mongoose.Schema({
  locale: String,
  heading: String,
  partner: [
    {
      image: String,
      content: String,
    },
  ],
});

module.exports = mongoose.model("OurPartner", ourPartnerSchema);
