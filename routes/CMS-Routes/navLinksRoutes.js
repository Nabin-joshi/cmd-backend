const router = require("express").Router();
const navbarTextController = require("../../controller/CMSControllers/navLinksController");
const auth = require("../../middlewares/auth");
const getFileUploadMiddleware = require("../../middlewares/fileUpload");

router.post("/create", navbarTextController.create);

router.get("/getAllNavLinks", navbarTextController.getAll);

router.get("/getAllNavLinksHome/:locale", navbarTextController.getAllHome);

router.get("/getNavLinkByKey/:locale", navbarTextController.getByKey);

router.put(
  "/updateNavLink/:locale",
  getFileUploadMiddleware("public/images", [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
  ]).single("pageBannerImage"),
  navbarTextController.update
);

router.get("/deleteNavLink/:locale", navbarTextController.delete);

router.put("/updateNavTitle/:locale", navbarTextController.updateNavTitle);

router.get("/getNavTitle/:locale", navbarTextController.getNavTitle);

module.exports = router;
