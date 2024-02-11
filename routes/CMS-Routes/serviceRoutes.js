const router = require("express").Router();
const serviceController = require("../../controller/CMSControllers/serviceController");
const auth = require("../../middlewares/auth");

// create

router.post("/developer/create", serviceController.create);

router.get("/getService/:id", serviceController.getService);

router.put("/updateService/:id", serviceController.update);

module.exports = router;
