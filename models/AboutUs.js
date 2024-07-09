const mongoose = require("mongoose");

const aboutUsSchema = new mongoose.Schema({
  aboutUsHeaderImage: {
    type: String,
    default: "",
  },
  history: {
    type: String,
    default: "",
  },
  historyNepali: {
    type: String,
    default: "",
  },
  whoWeAre: {
    type: String,
    default: "",
  },
  whoWeAreNepali: {
    type: String,
    default: "",
  },
  ourValues: {
    type: String,
    default: "",
  },
  ourValuesNepali: {
    type: String,
    default: "",
  },
  vision: {
    type: String,
    default: "",
  },
  visionNepali: {
    type: String,
    default: "",
  },
  mission: {
    type: String,
    default: "",
  },
  missionNepali: {
    type: String,
    default: "",
  },
  goal: {
    type: String,
    default: "",
  },
  goalNepali: {
    type: String,
    default: "",
  },
  ourThematicAreas: [
    {
      title: {
        type: String,
      },
      titleNepali: {
        type: String,
      },
    },
  ],
  boardCommittees: [
    {
      name: {
        type: String,
      },
      nameNepali: {
        type: String,
      },
      gender: {
        type: String,
      },

      position: {
        type: String,
      },
      positionNepali: {
        type: String,
      },
      role: {
        type: String,
      },
      photo: {
        type: String,
      },
    },
  ],
  meetTheTeam: {
    type: String,
    default: "",
  },
  ourApproach: {
    type: String,
    default: "",
  },
  ourApproachNepali: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("AboutUs", aboutUsSchema);
