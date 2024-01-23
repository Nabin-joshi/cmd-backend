const mongoose = require("mongoose");

const { Schema } = mongoose;

const serviceSchema = new Schema(
  {
    content: { type: String, required: true },
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema, "services");
