const mongoose = require("mongoose");

const bannerImages = new mongoose.Schema({
  locale: String,
  aboutUsHistory: String,
  aboutUsIntroduction: String,
  aboutUsOurTeam: String,
  aboutUsOurPartners: String,
  aboutUsStrategicPlan: String,
  ourWorkAdvocacyAwarness: String,
  ourWorkEmpowerment: String,
  ourWorkSupport: String,
  ourWorkOrgDevelopment: String,
  ourWorkESCS: String,
  resourcesNewsAndEvents: String,
  resourcesVacancy: String,
  resourcesVolunteer: String,
  resourcesDigitalLibrary: String,
  resourcesTransformingLives: String,
  resourcesBlog: String,
  getInvolvedProcurement: String,
  getInvolvedVacancy: String,
  getInvolvedVolunteer: String,
  getInvolvedDonate: String,
});

const BannerImages = mongoose.model("BannerImages", bannerImages);

module.exports = BannerImages;
