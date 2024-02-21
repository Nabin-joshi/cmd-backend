const mongoose = require("mongoose");

const ourPartnerSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  headingNepali: {
    type: String,
  },
  contents: [
    {
      icon: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("OurPartner", ourPartnerSchema);
