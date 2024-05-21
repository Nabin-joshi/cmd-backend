const router = require("express").Router();
const BrandingController = require("../../controller/CMSControllers/brandingController");
const auth = require("../../middlewares/auth");
const getFileUploadMiddleware = require("../../middlewares/fileUpload");

router.post("/developer/create", BrandingController.createBranding);

router.put(
  "/updateBranding/logo/:id",
  getFileUploadMiddleware("public/images", [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
  ]).single("image"),
  BrandingController.updateLogo
);

router.get("/getBranding", BrandingController.getBranding);

router.put("/updateBranding/:id", BrandingController.updateBranding);

module.exports = router;
