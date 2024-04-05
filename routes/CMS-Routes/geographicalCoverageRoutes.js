const router = require("express").Router();
const geoCoverage = require("../../controller/CMSControllers/geographicalCoverageController");
const auth = require("../../middlewares/auth");

// create

router.post("/developer/create/geographicalCoverage", geoCoverage.create);

router.get("/getGeographicalCoverage/:locale", geoCoverage.get);

router.put("/updateGeographicalCoverage/:locale", geoCoverage.update);

router.post("/developer/create/geoMap", geoCoverage.createGeoMap);

router.get("/getGeoMap/:locale", geoCoverage.getGeoMap);

router.get("/getAllGeoMap", geoCoverage.getAllGeoMaps);

router.put("/updateGeoMap/:locale", geoCoverage.updateGeoMap);

module.exports = router;
