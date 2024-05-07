const mongoose = require("mongoose");

const SocialLinks = new mongoose.Schema({
  locale: String,
  facebook: String,
  youtube: String,
  instagram: String,
  twitter: String,
  linkedIn: String,
});

const socialLinks = mongoose.model("SocialLinks", SocialLinks);

module.exports = socialLinks;
