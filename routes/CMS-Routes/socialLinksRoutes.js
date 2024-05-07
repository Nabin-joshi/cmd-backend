const router = require("express").Router();
const socialLinksController = require("../../controller/CMSControllers/socialLinksController");

router.post("/createSocialLinks", socialLinksController.create);

router.get("/getSocialLinks", socialLinksController.get);

router.put("/updateSocialLinks", socialLinksController.update);

module.exports = router;
