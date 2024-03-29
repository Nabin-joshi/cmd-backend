const router = require("express").Router();
const yourSupportController = require("../../controller/CMSControllers/yourSupportController");
const auth = require("../../middlewares/auth");

// create

router.post("/developer/create/yourSupport", yourSupportController.create);

router.get("/getYourSupport/:locale", yourSupportController.getService);

router.get("/getall", yourSupportController.getAllYourSupport);

router.put("/update/support/:locale", yourSupportController.update);

module.exports = router;
