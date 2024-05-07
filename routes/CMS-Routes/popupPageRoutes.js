const router = require("express").Router();
const popupPageController = require("../../controller/CMSControllers/popupPageController");

router.post("/createPopupPage", popupPageController.create);

router.get("/getPopupPage/:locale", popupPageController.get);

router.get("/getAllPopupPage", popupPageController.getAll);

router.put("/updatePopupPage/:locale", popupPageController.update);

module.exports = router;
