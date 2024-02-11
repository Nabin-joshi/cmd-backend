const router = require("express").Router();
const sliderController = require("../../controller/CMSControllers/sliderController");
const auth = require("../../middlewares/auth");

// create

router.post("/developer/create", sliderController.create);

router.get("/getSlider/:id", sliderController.get);

router.put("/updateSlider/:id", sliderController.update);

module.exports = router;
