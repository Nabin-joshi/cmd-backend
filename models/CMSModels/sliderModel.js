const mongoose = require("mongoose");

const { Schema } = mongoose;

const sliderSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageName: { type: String, required: false },
    readMoreButtonColor: { type: String, required: false },
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    locale: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Slider", sliderSchema, "slider");
