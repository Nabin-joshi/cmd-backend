const mongoose = require("mongoose");

const resourcesSchema = mongoose.Schema({
  media: {
    type: String,
    default: "",
  },

  mediaNepali: {
    type: String,
    default: "",
  },

  newsAndPressRelease: {
    type: String,
    default: "",
  },
  newsAndPressReleaseNepali: {
    type: String,
    default: "",
  },
  events: {
    type: String,
    default: "",
  },

  eventsNepali: {
    type: String,
    default: "",
  },

  digitalLibrary: {
    type: String,
    default: "",
  },

  digitalLibraryNepali: {
    type: String,
    default: "",
  },

  transformingLives: {
    type: String,
    default: "",
  },

  transformingLivesNepali: {
    type: String,
    default: "",
  },

  blog: {
    type: String,
    default: "",
  },

  blogNepali: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Resources", resourcesSchema);
