const express = require("express");
const resourceRouter = express.Router();
const resourceController = require("../controller/resourcesController");
const resourceImagesController = require("../controller/CMSControllers/resourcesImagesController");
const getFileUploadMiddleware = require("../middlewares/fileUpload");

// resourceRouter.post("/resources", resourceController.createBroadCommitte);
resourceRouter.put("", resourceController.updateGetResourcesField);
resourceRouter.get("", resourceController.getResources);
// resourceRouter.delete(
//   "/resources/:id",
//   resourceController.deleteBoardCommitteeMembers
// );
// resourceRouter.delete("/resources/:id", resourceController.deleteThematicAreas);

resourceRouter.put(
  "/updateResourcesImage",
  getFileUploadMiddleware("public/images", [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
  ]).single("image"),
  resourceImagesController.update
);

resourceRouter.post("/createResourcesImage", resourceImagesController.create);
resourceRouter.get("/getResourcesImage", resourceImagesController.get);
module.exports = resourceRouter;
