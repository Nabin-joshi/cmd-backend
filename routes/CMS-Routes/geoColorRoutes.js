const router = require("express").Router();
const geoColorController = require("../../controller/CMSControllers/geoColorController");
const auth = require("../../middlewares/auth");

router.post("/create", geoColorController.create);

router.get("/getcolors", geoColorController.get);

router.put("/updatecolor", geoColorController.update);

router.delete("/delete", geoColorController.delete);

module.exports = router;
