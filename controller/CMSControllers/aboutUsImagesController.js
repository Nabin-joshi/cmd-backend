const { BACKEND_SERVER_PATH } = require("../../config/config");
const AboutUs = require("../../models/CMSModels/aboutUsNavbarImages");

const createAboutUsImage = async (req, res, next) => {
  const { locale, aboutUsHistory, aboutUsIntroduction, aboutUsOurTeam } =
    req.body;

  let newData;

  try {
    newData = new AboutUs({
      locale,
      aboutUsHistory,
      aboutUsIntroduction,
      aboutUsOurTeam,
      aboutUsOurPartners,
      strategicPlan,
    });
    await newData.save();
    return res.status(201).json({ msg: "Work Created successfully" });
  } catch (err) {
    return next(err);
  }
};

const updateAboutUsImage = async (req, res, next) => {
  const data = req.body;

  try {
    selectedData = await AboutUs.findOne({ locale: "" });

    if (req.file) {
      if (data.name === "aboutUsHistory") {
        selectedData.aboutUsHistory = req.file.filename;
        await selectedData.save();
      } else if (data.name === "aboutUsIntroduction") {
        selectedData.aboutUsIntroduction = req.file.filename;
        await selectedData.save();
      } else if (data.name === "aboutUsOurTeam") {
        selectedData.aboutUsOurTeam = req.file.filename;
        await selectedData.save();
      } else if (data.name === "aboutUsOurPartners") {
        selectedData.aboutUsOurPartners = req.file.filename;
        await selectedData.save();
      } else if (data.name === "strategicPlan") {
        selectedData.strategicPlan = req.file.filename;
        await selectedData.save();
      }
      res.status(201).json({ msg: "Work Updated Successfully" });
    } else {
      res.status(201).json({ msg: "No Image Uploaded" });
    }
  } catch (err) {
    return next(err);
  }
};

const getAboutUsImage = async (req, res, next) => {
  try {
    let aboutUsImages = await AboutUs.findOne({ locale: "" });
    if (aboutUsImages.aboutUsHistory && aboutUsImages.aboutUsHistory != "") {
      aboutUsImages.aboutUsHistory = `${BACKEND_SERVER_PATH}/public/images/${aboutUsImages.aboutUsHistory}`;
    }

    if (
      aboutUsImages.aboutUsIntroduction &&
      aboutUsImages.aboutUsIntroduction != ""
    ) {
      aboutUsImages.aboutUsIntroduction = `${BACKEND_SERVER_PATH}/public/images/${aboutUsImages.aboutUsIntroduction}`;
    }

    if (aboutUsImages.aboutUsOurTeam && aboutUsImages.aboutUsOurTeam != "") {
      aboutUsImages.aboutUsOurTeam = `${BACKEND_SERVER_PATH}/public/images/${aboutUsImages.aboutUsOurTeam}`;
    }

    if (
      aboutUsImages.aboutUsOurPartners &&
      aboutUsImages.aboutUsOurPartners != ""
    ) {
      aboutUsImages.aboutUsOurPartners = `${BACKEND_SERVER_PATH}/public/images/${aboutUsImages.aboutUsOurPartners}`;
    }

    if (aboutUsImages.strategicPlan && aboutUsImages.strategicPlan != "") {
      aboutUsImages.strategicPlan = `${BACKEND_SERVER_PATH}/public/images/${aboutUsImages.strategicPlan}`;
    }

    return res.status(200).json(aboutUsImages);
  } catch (err) {
    return next(err);
  }
};

const aboutUsImageController = {
  create: createAboutUsImage,
  update: updateAboutUsImage,
  get: getAboutUsImage,
};
module.exports = aboutUsImageController;
