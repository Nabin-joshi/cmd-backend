const router = require("express").Router();
const mentalHealthController = require("../../controller/CMSControllers/mentalHealthController");
const auth = require("../../middlewares/auth");

// create

router.post("/developer/create/", mentalHealthController.create);

router.get("/getMentalHealth/:locale", mentalHealthController.get);

router.get("/getAllMentalHealth", mentalHealthController.getAll);

router.put("/updateMentalHealth/:locale", mentalHealthController.update);

module.exports = router;
