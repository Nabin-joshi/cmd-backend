const express = require("express");
const aboutUsRouter = express.Router();
const aboutUsController = require("../controller/AboutUsController");
const aboutUsImageController = require("../controller/CMSControllers/aboutUsImagesController");
const aboutUsHistoryController = require("../controller/CMSControllers/About-Us/historyController");
const aboutUsIntroductionController = require("../controller/CMSControllers/About-Us/introductionController");

const getFileUploadMiddleware = require("../middlewares/fileUpload");

aboutUsRouter.post("/broadCommittee", aboutUsController.createBroadCommitte);
aboutUsRouter.put("/broadCommittee", aboutUsController.updateAboutUsFields);
aboutUsRouter.put(
  "/updateAboutUsHeaderImage",
  aboutUsController.updateAboutUsFields
);

aboutUsRouter.get("/broadCommittee", aboutUsController.getAboutUs);
aboutUsRouter.delete(
  "/broadCommittee/:id",
  aboutUsController.deleteBoardCommitteeMembers
);
aboutUsRouter.delete(
  "/thematicAreas/:id",
  aboutUsController.deleteThematicAreas
);

aboutUsRouter.put(
  "/updateNavImage",
  getFileUploadMiddleware("public/images", [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
  ]).single("image"),
  aboutUsImageController.update
);

aboutUsRouter.post("/createAboutusImage", aboutUsImageController.create);
aboutUsRouter.get("/getAboutUsImage", aboutUsImageController.get);

// History

aboutUsRouter.post("/create/history", aboutUsHistoryController.create);

aboutUsRouter.get("/getAllHistory", aboutUsHistoryController.getAll);

aboutUsRouter.put(
  "/updateHistory/:locale",
  getFileUploadMiddleware("public/images", [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
  ]).single("image"),
  aboutUsHistoryController.update
);

aboutUsRouter.delete(
  "/delete/history/:locale",
  aboutUsHistoryController.deleteHistory
);

aboutUsRouter.get("/getHistory/:locale", aboutUsHistoryController.get);

aboutUsRouter.put(
  "/update/history/description/:locale",
  aboutUsHistoryController.updateHistoryDescription
);

// Introduction

aboutUsRouter.post(
  "/create/introduction",
  aboutUsIntroductionController.createIntroduction
);

aboutUsRouter.get(
  "/getAllIntrodcution",
  aboutUsIntroductionController.getAllIntroductionContent
);

aboutUsRouter.put(
  "/updateIntrodcution/:locale",
  getFileUploadMiddleware("public/images", [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
  ]).single("image"),
  aboutUsIntroductionController.updateIntroductionData
);

aboutUsRouter.get(
  "/getIntrodcution/:locale",
  aboutUsIntroductionController.getIntroductionContent
);

// thematic Areas

aboutUsRouter.post(
  "/create/thematicArea",
  aboutUsIntroductionController.createOurThematicArea
);

aboutUsRouter.get(
  "/getThematicArea/:locale",
  aboutUsIntroductionController.getOurThematicArea
);

aboutUsRouter.get(
  "/getAllThematicArea",
  aboutUsIntroductionController.getAllOurThematicArea
);

aboutUsRouter.delete(
  "/delete/thematicArea/:locale",
  aboutUsIntroductionController.deleteOurThematicArea
);

aboutUsRouter.put(
  "/updateThematicArea/:locale",
  getFileUploadMiddleware("public/images", [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
  ]).single("image"),
  aboutUsIntroductionController.updateThematicArea
);

aboutUsRouter.put(
  "/update/thematicArea/heading/:locale",
  aboutUsIntroductionController.updateOurThematicAreasHeading
);

//      our Values

aboutUsRouter.post(
  "/create/ourValues",
  aboutUsIntroductionController.createOurValues
);

aboutUsRouter.get(
  "/getOurValue/:locale",
  aboutUsIntroductionController.getOurValues
);

aboutUsRouter.get(
  "/getAllOurValue",
  aboutUsIntroductionController.getAllOurValues
);

aboutUsRouter.delete(
  "/delete/ourValue/:locale",
  aboutUsIntroductionController.deleteOurValues
);

aboutUsRouter.put(
  "/updateOurValue/:locale",
  getFileUploadMiddleware("public/images", [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
  ]).single("image"),
  aboutUsIntroductionController.updateValues
);

aboutUsRouter.put(
  "/update/ourValue/heading/:locale",
  aboutUsIntroductionController.updateOurValuesHeading
);

//          our Approach

aboutUsRouter.post(
  "/create/ourApproach",
  aboutUsIntroductionController.createOurApproach
);

aboutUsRouter.get(
  "/getOurApproach/:locale",
  aboutUsIntroductionController.getOurApproach
);

aboutUsRouter.get(
  "/getAllOurApproach",
  aboutUsIntroductionController.getAllOurApproach
);

aboutUsRouter.delete(
  "/delete/ourApproach/:locale",
  aboutUsIntroductionController.deleteOurApproach
);

aboutUsRouter.put(
  "/updateOurApproach/:locale",
  getFileUploadMiddleware("public/images", [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
  ]).single("image"),
  aboutUsIntroductionController.updateApproach
);

aboutUsRouter.put(
  "/update/ourApproach/heading/:locale",
  aboutUsIntroductionController.updateOurApproachHeading
);

module.exports = aboutUsRouter;
