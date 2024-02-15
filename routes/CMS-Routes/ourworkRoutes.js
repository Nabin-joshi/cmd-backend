const router = require("express").Router();
const ourworkController = require("../../controller/CMSControllers/ourWorkController");
const auth = require("../../middlewares/auth");

// create

router.post("/developer/create", ourworkController.create);

router.get("/getOurwork/:locale", ourworkController.get);

router.put("/updateOurwork/:locale", ourworkController.update);

module.exports = router;
