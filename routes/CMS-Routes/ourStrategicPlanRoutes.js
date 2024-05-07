const router = require("express").Router();
const ourStrategicPlanController = require("../../controller/CMSControllers/ourStrategicPlanController");
const auth = require("../../middlewares/auth");

// create

router.post("/developer/create", ourStrategicPlanController.create);

router.get("/getStrategicPlan/:locale", ourStrategicPlanController.get);

router.get("/getAllStrategicPlan", ourStrategicPlanController.getAll);

router.put("/updateStrategicPlan/:locale", ourStrategicPlanController.update);

module.exports = router;
