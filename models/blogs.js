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
    },
  ],
});

const Blogs = mongoose.model("Blogs", blogs);

module.exports = Blogs;
