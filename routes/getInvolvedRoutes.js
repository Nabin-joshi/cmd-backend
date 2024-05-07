const express = require("express");
const getInvolvedRouter = express.Router();
const getInvolvedController = require("../controller/getInvolvedController");
const getInvolvedImagesController = require("../controller/CMSControllers/getInvolvedImagesController");
const getFileUploadMiddleware = require("../middlewares/fileUpload");

// getInvolvedRouter.post("/resources", resourceController.createBroadCommitte);
getInvolvedRouter.put("", getInvolvedController.updateGetInvolvedField);
getInvolvedRouter.get("", getInvolvedController.getInvolvedData);
// getInvolvedRouter.delete(
//   "/resources/:id",
//   resourceController.deleteBoardCommitteeMembers
// );
// getInvolvedRouter.delete("/resources/:id", resourceController.deleteThematicAreas);

getInvolvedRouter.put(
  "/updateGetInvolvedImage",
  getFileUploadMiddleware("public/images", [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
  ]).single("image"),
  getInvolvedImagesController.update
);

getInvolvedRouter.post(
  "/createGetInvolvedImage",
  getInvolvedImagesController.create
);
getInvolvedRouter.get("/getGetInvolvedImages", getInvolvedImagesController.get);
module.exports = getInvolvedRouter;
