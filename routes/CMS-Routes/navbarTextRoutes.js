const router = require("express").Router();
const navbarTextController = require("../../controller/CMSControllers/navbarTextController");
const auth = require("../../middlewares/auth");

router.post("/create", navbarTextController.create);

router.get("/getText/:locale", navbarTextController.get);

router.put("/updateText/:locale", navbarTextController.update);

router.get("/getAllText", navbarTextController.getAll);

module.exports = router;
