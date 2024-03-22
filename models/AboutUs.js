const mongoose = require("mongoose");

const aboutUsSchema = new mongoose.Schema({
  history: {
    type: String,
  },
  historyNepali: {
    type: String,
  },
  whoWeAre: {
    type: String,
  },
  whoWeAreNepali: {
    type: String,
  },
  ourValues: {
    type: String,
  },
  ourValuesNepali: {
    type: String,
  },
  vision: {
    type: String,
  },
  visionNepali: {
    type: String,
  },
  mission: {
    type: String,
  },
  missionNepali: {
    type: String,
  },
  goal: {
    type: String,
  },
  goalNepali: {
    type: String,
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
    },
  ],
  meetTheTeam: {
    type: String,
  },
});

module.exports = mongoose.model("AboutUs", aboutUsSchema);
