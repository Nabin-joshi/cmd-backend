const AboutUs = require("../models/AboutUs");
const OurProgram = require("../models/OurProgram");
const contactUs = require("../models/contactUs");
exports.initializeDatabaseTables = async () => {
  let ourProgamObject = await OurProgram.findOne({});

  if (!ourProgamObject) {
    ourProgamObject = await new OurProgram().save();
  }

  let contactUsObj = await contactUs.findOne({});

  if (!contactUsObj) {
    contactUsObj = await new contactUs().save();
  }

  let aboutUsObj = await AboutUs.findOne({});
  if (!aboutUsObj) {
    aboutUsObj = await new AboutUs().save();
  }
};
