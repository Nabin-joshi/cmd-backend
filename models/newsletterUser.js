const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const newsLetterUserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please enter name. "],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email already exists !!! "],
      validate: [validator.isEmail, "please enter valid email !! "],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "NewsLetterUser",
  newsLetterUserSchema,
  "newsletter_users"
);
