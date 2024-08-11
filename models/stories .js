const { boolean } = require("joi");
const mongoose = require("mongoose");

const storiesSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  headingNepali: {
    type: String,
  },
  contents: [
    {
      desc: {
        type: String,
      },
      descNepali: {
        type: String,
      },
      image: {
        type: String,
      },
      person: {
        type: String,
      },
      personNepali: {
        type: String,
      },
      display: {
        type: Boolean,
      },
      detail: {
        type: String,
        default: "",
      },
      detailNepali: {
        type: String,
        default: "",
      },
    },
  ],
  readMoreBtnColor: {
    type: String,
  },
});

module.exports = mongoose.model("Stories", storiesSchema);
