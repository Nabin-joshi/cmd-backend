const mongoose = require("mongoose");

const newsLetterUserGroupMapSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "NewsLetterUser",
      required: true,
      unique: true,
    },
    groupId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "NewsLetterGroup",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "NewsLetterUserGroupMap",
  newsLetterUserGroupMapSchema,
  "news_letter_user_group_map"
);
