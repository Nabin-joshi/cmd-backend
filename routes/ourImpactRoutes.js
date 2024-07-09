const express = require("express");
const ourImpactRouter = express.Router();
const ourImpactController = require("../controller/ourImpactController");
const auth = require("../middlewares/auth");
ourImpactRouter.post("/heading", ourImpactController.createOurImpactHeading);
ourImpactRouter.post("/contents", ourImpactController.createOurImpactContents);

// get all
ourImpactRouter.get("/all", ourImpactController.getAllOurImpacts);

// get blog by id
ourImpactRouter.get("/:id", ourImpactController.getOurImpactById);

// update
ourImpactRouter.put("", ourImpactController.updateOurImpacts);

// delete
ourImpactRouter.delete("/delete/:id", ourImpactController.deleteOurImpact);

module.exports = ourImpactRouter;
