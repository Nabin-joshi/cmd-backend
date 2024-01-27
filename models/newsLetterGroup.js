const mongoose = require("mongoose");
const { Schema } = mongoose;

const newsLetterGroupSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please enter name !!!"],
    },
  },
  {
    tiemstamps: true,
  }
);

module.exports = mongoose.model(
  "NewsLetterGroup",
  newsLetterGroupSchema,
  "news_letter_group"
);
