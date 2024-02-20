const router = require("express").Router();
const sliderController = require("../../controller/CMSControllers/sliderController");
const auth = require("../../middlewares/auth");
const getFileUploadMiddleware = require("../../middlewares/fileUpload");

// create

router.post("/developer/create", sliderController.create);

router.get("/getSlider/:locale", sliderController.get);

router.put("/updateSlider/:locale", sliderController.update);

router.put(
  "/sliderImage",
  getFileUploadMiddleware("public/images", [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
  ]).single("image"),
  sliderController.updateSliderImage
);

router.put(
  "/sliderVideo",
  getFileUploadMiddleware("public/videos", [".mp4", ".mkv"]).single("video"),
  sliderController.updateSliderVideo
);

module.exports = router;
