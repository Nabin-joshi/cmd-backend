const router = require("express").Router();
const ourworkController = require("../../controller/CMSControllers/ourWorkController");
const auth = require("../../middlewares/auth");
const getFileUploadMiddleware = require("../../middlewares/fileUpload");

// create

router.post("/developer/create", ourworkController.create);

router.get("/getOurwork/:locale", ourworkController.get);

router.put(
  "/updateOurwork/:locale",
  getFileUploadMiddleware("public/images", [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
  ]).single("image"),
  ourworkController.update
);

module.exports = router;
