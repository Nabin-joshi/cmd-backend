const mongoose = require("mongoose");

const blogs = new mongoose.Schema({
  locale: String,
  blogs: [
    {
      image: String,
      title: String,
      day: String,
      month: String,
      contentDescription: String,
      details: String,
      navigationLink: {
        type: String,
        default: function () {
          return this._id;
        },
        unique: true,
      },
    },
  ],
});

const Blogs = mongoose.model("Blogs", blogs);

module.exports = Blogs;
