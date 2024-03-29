const router = require("express").Router();
const latestNewsController = require("../../controller/CMSControllers/latestNewsController");
const auth = require("../../middlewares/auth");
const getFileUploadMiddleware = require("../../middlewares/fileUpload");

router.post("/developer/create", latestNewsController.create);

router.get("/getAllNews", latestNewsController.getAll);

router.put(
  "/updateLatestNews/:locale",
  getFileUploadMiddleware("public/images", [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
  ]).single("image"),
  latestNewsController.update
);

router.delete("/delete/:locale", latestNewsController.deleteNews);

router.get("/getNews/:locale", latestNewsController.get);

module.exports = router;
