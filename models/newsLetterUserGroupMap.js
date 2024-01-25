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

console.log(
  mongoose.model(
    "NewsLetterUserGroupMap", //if a collection with this name already existed, mongodb will use it, otherwise it will be created
    newsLetterUserGroupMapSchema, //it define the structure of documents that will be stored in mongoDB
    "news_letter_user_group_map"
  )
);
