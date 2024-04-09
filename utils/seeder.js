const AboutUs = require("../models/AboutUs");
const OurProgram = require("../models/OurProgram");
const contactUs = require("../models/contactUs");
const donation = require("../models/donation");
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

  let donationObj = await donation.findOne({});
  if (!donationObj) {
    donationObj = await new donation().save();
  }
};
