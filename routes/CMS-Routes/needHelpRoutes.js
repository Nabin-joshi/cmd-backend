const router = require("express").Router();
const needHelpController = require("../../controller/CMSControllers/needHelpController");
const auth = require("../../middlewares/auth");

router.post("/developer/create", needHelpController.createNeedHelp);

router.get("/getNeedHelp/:locale", needHelpController.getNeedHelp);

router.get("/getAllNeedHelp", needHelpController.getAllNeedHelp);

router.put("/updateNeedHelp/:locale", needHelpController.updateNeedHelp);

module.exports = router;
