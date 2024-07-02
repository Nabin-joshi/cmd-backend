const mongoose = require("mongoose");

const publication = new mongoose.Schema({
  locale: String,
  publication: [
    {
      title: String,
      pdf: String,
    },
  ],
});

const Publication = mongoose.model("Publication", publication);

module.exports = Publication;
