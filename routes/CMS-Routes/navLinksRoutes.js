const router = require("express").Router();
const navbarTextController = require("../../controller/CMSControllers/navLinksController");
const auth = require("../../middlewares/auth");

router.post("/create", navbarTextController.create);

router.get("/getAllNavLinks", navbarTextController.getAll);

router.get("/getAllNavLinksHome/:locale", navbarTextController.getAllHome);

router.get("/getNavLinkByKey/:locale", navbarTextController.getByKey);

router.put("/updateNavLink/:locale", navbarTextController.update);

router.get("/deleteNavLink/:locale", navbarTextController.delete);

module.exports = router;
