const router = require("express").Router();
const serviceController = require("../../controller/CMSControllers/serviceController");
const auth = require("../../middlewares/auth");

// create

router.post("/developer/create", serviceController.create);

router.get("/getService/:locale", serviceController.getService);

router.put("/updateService/:locale", serviceController.update);

module.exports = router;
