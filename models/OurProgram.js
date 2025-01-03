const mongoose = require("mongoose");

const ourProgramSchema = mongoose.Schema({
  advocacyAwarnessNepali: {
    type: String,
    default: "",
  },
  empowermentAndCommunityInclusionNepali: {
    type: String,
    default: "",
  },
  transformingCommunitySupportSystemNepali: {
    type: String,
    default: "",
  },
  organizationalDevelopmentNepali: {
    type: String,
    default: "",
  },
  ecscNepali: {
    type: String,
    default: "",
  },

  advocacyAwarness: {
    type: String,
    default: "",
  },
  empowermentAndCommunityInclusion: {
    type: String,
    default: "",
  },
  transformingCommunitySupportSystem: {
    type: String,
    default: "",
  },
  organizationalDevelopment: {
    type: String,
    default: "",
  },
  ecsc: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("ourProgam", ourProgramSchema);
