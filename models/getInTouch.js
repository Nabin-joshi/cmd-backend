const mongoose = require("mongoose");

const getInTouchSchema = mongoose.Schema({
  email: {
    type: String,
  },
  message: {
    type: String,
  },
  name: {
    type: String,
  },
});

module.exports = mongoose.model("getInTouch", getInTouchSchema);
