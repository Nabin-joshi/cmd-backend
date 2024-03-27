const express = require("express");
const resourceRouter = express.Router();
const resourceController = require("../controller/resourcesController");

// resourceRouter.post("/resources", resourceController.createBroadCommitte);
resourceRouter.put("", resourceController.updateGetResourcesField);
resourceRouter.get("", resourceController.getResources);
// resourceRouter.delete(
//   "/resources/:id",
//   resourceController.deleteBoardCommitteeMembers
// );
// resourceRouter.delete("/resources/:id", resourceController.deleteThematicAreas);
module.exports = resourceRouter;
