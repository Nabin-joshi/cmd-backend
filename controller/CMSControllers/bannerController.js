const { BACKEND_SERVER_PATH } = require("../../config/config");
const BannerImages = require("../../models/CMSModels/bannerImages");

const createBannerImages = async (req, res, next) => {
  const {
    locale,
    aboutUsHistory,
    aboutUsIntroduction,
    aboutUsOurTeam,
    aboutUsOurPartners,
    aboutUsStrategicPlan,
    ourWorkAdvocacyAwarness,
    ourWorkEmpowerment,
    ourWorkSupport,
    ourWorkOrgDevelopment,
    ourWorkESCS,
    resourcesProcurement,
    resourcesVacancy,
    resourcesVolunteer,
    resourcesDigitalLibrary,
    resourcesTransformingLives,
    resourcesBlog,
    getInvolvedProcurement,
    getInvolvedVacancy,
    getInvolvedVolunteer,
    getInvolvedDonate,
  } = req.body;

  let newData;

  try {
    newData = new BannerImages({
      locale,
      aboutUsHistory,
      aboutUsIntroduction,
      aboutUsOurTeam,
      aboutUsOurPartners,
      aboutUsStrategicPlan,
      ourWorkAdvocacyAwarness,
      ourWorkEmpowerment,
      ourWorkSupport,
      ourWorkOrgDevelopment,
      ourWorkESCS,
      resourcesProcurement,
      resourcesVacancy,
      resourcesVolunteer,
      resourcesDigitalLibrary,
      resourcesTransformingLives,
      resourcesBlog,
      getInvolvedProcurement,
      getInvolvedVacancy,
      getInvolvedVolunteer,
      getInvolvedDonate,
    });
    await newData.save();
    return res.status(201).json({ msg: "Banner Image Created successfully" });
  } catch (err) {
    return next(err);
  }
};

const updateBannerImage = async (req, res, next) => {
  const data = req.body;

  try {
    const selectedData = await BannerImages.findOne({ locale: "" });

    if (req.file) {
      switch (data.name) {
        case "aboutUsHistory":
          selectedData.aboutUsHistory = req.file.filename;
          break;
        case "aboutUsIntroduction":
          selectedData.aboutUsIntroduction = req.file.filename;
          break;
        case "aboutUsOurTeam":
          selectedData.aboutUsOurTeam = req.file.filename;
          break;
        case "aboutUsOurPartners":
          selectedData.aboutUsOurPartners = req.file.filename;
          break;
        case "aboutUsStrategicPlan":
          selectedData.aboutUsStrategicPlan = req.file.filename;
          break;
        case "ourWorkAdvocacyAwarness":
          selectedData.ourWorkAdvocacyAwarness = req.file.filename;
          break;
        case "ourWorkEmpowerment":
          selectedData.ourWorkEmpowerment = req.file.filename;
          break;
        case "ourWorkSupport":
          selectedData.ourWorkSupport = req.file.filename;
          break;
        case "ourWorkOrgDevelopment":
          selectedData.ourWorkOrgDevelopment = req.file.filename;
          break;
        case "ourWorkESCS":
          selectedData.ourWorkESCS = req.file.filename;
          break;
        case "resourcesProcurement":
          selectedData.resourcesProcurement = req.file.filename;
          break;
        case "resourcesVacancy":
          selectedData.resourcesVacancy = req.file.filename;
          break;
        case "resourcesVolunteer":
          selectedData.resourcesVolunteer = req.file.filename;
          break;
        case "resourcesDigitalLibrary":
          selectedData.resourcesDigitalLibrary = req.file.filename;
          break;
        case "resourcesTransformingLives":
          selectedData.resourcesTransformingLives = req.file.filename;
          break;
        case "resourcesBlog":
          selectedData.resourcesBlog = req.file.filename;
          break;
        case "getInvolvedProcurement":
          selectedData.getInvolvedProcurement = req.file.filename;
          break;
        case "getInvolvedVacancy":
          selectedData.getInvolvedVacancy = req.file.filename;
          break;
        case "getInvolvedVolunteer":
          selectedData.getInvolvedVolunteer = req.file.filename;
          break;
        case "getInvolvedDonate":
          selectedData.getInvolvedDonate = req.file.filename;
          break;
        default:
          res.status(400).json({ msg: "Invalid data name" });
          return;
      }
      await selectedData.save();
      res.status(201).json({ msg: "Work Updated Successfully" });
    } else {
      res.status(201).json({ msg: "No Image Uploaded" });
    }
  } catch (err) {
    return next(err);
  }
};

const getBannerImages = async (req, res, next) => {
  try {
    let bannerImage = await BannerImages.findOne({ locale: "" });

    if (bannerImage.aboutUsHistory && bannerImage.aboutUsHistory !== "") {
      bannerImage.aboutUsHistory = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
        bannerImage.aboutUsHistory
      )}`;
    }

    if (
      bannerImage.aboutUsIntroduction &&
      bannerImage.aboutUsIntroduction !== ""
    ) {
      bannerImage.aboutUsIntroduction = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
        bannerImage.aboutUsIntroduction
      )}`;
    }

    if (bannerImage.aboutUsOurTeam && bannerImage.aboutUsOurTeam !== "") {
      bannerImage.aboutUsOurTeam = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
        bannerImage.aboutUsOurTeam
      )}`;
    }

    if (
      bannerImage.aboutUsOurPartners &&
      bannerImage.aboutUsOurPartners !== ""
    ) {
      bannerImage.aboutUsOurPartners = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
        bannerImage.aboutUsOurPartners
      )}`;
    }

    if (
      bannerImage.aboutUsStrategicPlan &&
      bannerImage.aboutUsStrategicPlan !== ""
    ) {
      bannerImage.aboutUsStrategicPlan = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
        bannerImage.aboutUsStrategicPlan
      )}`;
    }

    if (
      bannerImage.ourWorkAdvocacyAwarness &&
      bannerImage.ourWorkAdvocacyAwarness !== ""
    ) {
      bannerImage.ourWorkAdvocacyAwarness = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
        bannerImage.ourWorkAdvocacyAwarness
      )}`;
    }

    if (
      bannerImage.ourWorkEmpowerment &&
      bannerImage.ourWorkEmpowerment !== ""
    ) {
      bannerImage.ourWorkEmpowerment = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
        bannerImage.ourWorkEmpowerment
      )}`;
    }

    if (bannerImage.ourWorkSupport && bannerImage.ourWorkSupport !== "") {
      bannerImage.ourWorkSupport = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
        bannerImage.ourWorkSupport
      )}`;
    }

    if (
      bannerImage.ourWorkOrgDevelopment &&
      bannerImage.ourWorkOrgDevelopment !== ""
    ) {
      bannerImage.ourWorkOrgDevelopment = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
        bannerImage.ourWorkOrgDevelopment
      )}`;
    }

    if (bannerImage.ourWorkESCS && bannerImage.ourWorkESCS !== "") {
      bannerImage.ourWorkESCS = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
        bannerImage.ourWorkESCS
      )}`;
    }

    if (
      bannerImage.resourcesProcurement &&
      bannerImage.resourcesProcurement !== ""
    ) {
      bannerImage.resourcesProcurement = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
        bannerImage.resourcesProcurement
      )}`;
    }

    if (bannerImage.resourcesVacancy && bannerImage.resourcesVacancy !== "") {
      bannerImage.resourcesVacancy = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
        bannerImage.resourcesVacancy
      )}`;
    }

    if (
      bannerImage.resourcesVolunteer &&
      bannerImage.resourcesVolunteer !== ""
    ) {
      bannerImage.resourcesVolunteer = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
        bannerImage.resourcesVolunteer
      )}`;
    }

    if (
      bannerImage.resourcesDigitalLibrary &&
      bannerImage.resourcesDigitalLibrary !== ""
    ) {
      bannerImage.resourcesDigitalLibrary = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
        bannerImage.resourcesDigitalLibrary
      )}`;
    }

    if (
      bannerImage.resourcesTransformingLives &&
      bannerImage.resourcesTransformingLives !== ""
    ) {
      bannerImage.resourcesTransformingLives = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
        bannerImage.resourcesTransformingLives
      )}`;
    }

    if (bannerImage.resourcesBlog && bannerImage.resourcesBlog !== "") {
      bannerImage.resourcesBlog = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
        bannerImage.resourcesBlog
      )}`;
    }

    if (
      bannerImage.getInvolvedProcurement &&
      bannerImage.getInvolvedProcurement !== ""
    ) {
      bannerImage.getInvolvedProcurement = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
        bannerImage.getInvolvedProcurement
      )}`;
    }

    if (
      bannerImage.getInvolvedVacancy &&
      bannerImage.getInvolvedVacancy !== ""
    ) {
      bannerImage.getInvolvedVacancy = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
        bannerImage.getInvolvedVacancy
      )}`;
    }

    if (
      bannerImage.getInvolvedVolunteer &&
      bannerImage.getInvolvedVolunteer !== ""
    ) {
      bannerImage.getInvolvedVolunteer = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
        bannerImage.getInvolvedVolunteer
      )}`;
    }

    if (bannerImage.getInvolvedDonate && bannerImage.getInvolvedDonate !== "") {
      bannerImage.getInvolvedDonate = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
        bannerImage.getInvolvedDonate
      )}`;
    }

    return res.status(200).json(bannerImage);
  } catch (err) {
    return next(err);
  }
};

const ourWorkImageController = {
  create: createBannerImages,
  update: updateBannerImage,
  get: getBannerImages,
};
module.exports = ourWorkImageController;
