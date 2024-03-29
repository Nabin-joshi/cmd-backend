const router = require("express").Router();
const ourworkController = require("../../controller/CMSControllers/ourWorkController");
const auth = require("../../middlewares/auth");
const getFileUploadMiddleware = require("../../middlewares/fileUpload");

// create

router.post("/developer/create", ourworkController.create);

router.get("/getOurwork/:locale", ourworkController.get);

router.get("/getAllWork", ourworkController.getAll);

router.delete("/delete/:locale", ourworkController.deleteWork);

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

router.put(
  "/update/ourWork/description/:locale",
  ourworkController.updateDescription
);

module.exports = router;
