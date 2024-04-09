const express = require("express");
const aboutUsRouter = express.Router();
const aboutUsController = require("../controller/AboutUsController");
const abputUsImageController = require("../controller/CMSControllers/aboutUsImagesController");
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
  abputUsImageController.update
);

aboutUsRouter.post("/createAboutusImage", abputUsImageController.create);
aboutUsRouter.get("/getAboutUsImage", abputUsImageController.get);

module.exports = aboutUsRouter;
