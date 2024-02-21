const router = require("express").Router();
const yourSupportController = require("../../controller/CMSControllers/yourSupportController");
const auth = require("../../middlewares/auth");

// create

router.post("/developer/create/yourSupport", yourSupportController.create);

router.get("/getYourSupport/:locale", yourSupportController.getService);

router.put("/updateYourSupport/:locale", yourSupportController.update);

module.exports = router;
