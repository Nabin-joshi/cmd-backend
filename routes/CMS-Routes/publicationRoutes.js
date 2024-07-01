const router = require("express").Router();
const publicationController = require("../../controller/CMSControllers/publicationController");
const auth = require("../../middlewares/auth");
const getFileUploadMiddleware = require("../../middlewares/fileUpload");

router.post("/create", publicationController.create);

router.get("/getAllPublications", publicationController.getAll);

router.put(
  "/updatePublication",
  getFileUploadMiddleware("public/pdf", [".pdf"]).single("pdf"),
  publicationController.update
);

router.delete("/delete", publicationController.deleteNews);

router.get("/getPublication/:id", publicationController.get);

module.exports = router;
