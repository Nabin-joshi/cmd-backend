const router = require("express").Router();
const quickLinkController = require("../../controller/CMSControllers/quickLinkController");

router.post("/create", quickLinkController.create);

router.get("/getAllQuickLink", quickLinkController.getAll);

router.put("/updateQuickLink/:locale", quickLinkController.update);

router.delete("/delete/:locale", quickLinkController.delete);

module.exports = router;
