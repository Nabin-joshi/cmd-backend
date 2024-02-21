const mongoose = require("mongoose");

const newsLetterUserGroupMapSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "NewsLetterUser",
      required: true,
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

newsLetterUserGroupMapSchema.index({ groupId: 1, userId: 1 }, { unique: true });
module.exports = mongoose.model(
  "NewsLetterUserGroupMap",
  newsLetterUserGroupMapSchema,
  "news_letter_user_group_map"
);
