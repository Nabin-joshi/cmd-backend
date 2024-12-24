const mongoose = require("mongoose");

const navLinks = new mongoose.Schema({
  locale: String,
  navlink: [
    {
      name: { type: String, default: "" },
      content: { type: String, default: "" },
      key: {
        type: String,
        default: function () {
          return this._id;
        },
        unique: true,
      },
      link: {
        type: String,
        default: function () {
          return this._id;
        },
        unique: true,
      },
      pageHeaderText: { type: String, default: "" },
      pageHeaderImage: { type: String, default: "" },
    },
  ],
});

const NavLinks = mongoose.model("NavLinks", navLinks);

module.exports = NavLinks;
