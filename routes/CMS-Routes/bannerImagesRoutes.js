const express = require("express");
const bannerImageRouter = express.Router();

const bannerImageController = require("../../controller/CMSControllers/bannerController");

const getFileUploadMiddleware = require("../../middlewares/fileUpload");

bannerImageRouter.put(
  "/updateBannerImage",
  getFileUploadMiddleware("public/images", [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
  ]).single("image"),
  bannerImageController.update
);

bannerImageRouter.post("/createBannerImage", bannerImageController.create);
bannerImageRouter.get("/getBannerImage", bannerImageController.get);

module.exports = bannerImageRouter;
