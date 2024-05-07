const express = require("express");
const ourProgramRoutes = express.Router();
const ourProgramController = require("../controller/ourProgramController");
const ourWorkImagesController = require("../controller/CMSControllers/ourWorkImagesController");
const getFileUploadMiddleware = require("../middlewares/fileUpload");

// ourProgramRoutes.post("/resources", ourProgramController.createBroadCommitte);
ourProgramRoutes.put("", ourProgramController.updateOurProgramField);
ourProgramRoutes.get("", ourProgramController.getOurProgram);
// ourProgramRoutes.delete(
//   "/resources/:id",
//   ourProgramController.deleteBoardCommitteeMembers
// );
// ourProgramRoutes.delete("/resources/:id", ourProgramController.deleteThematicAreas);

ourProgramRoutes.put(
  "/updateOurWorkImage",
  getFileUploadMiddleware("public/images", [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
  ]).single("image"),
  ourWorkImagesController.update
);

ourProgramRoutes.post("/createOurWorkImage", ourWorkImagesController.create);
ourProgramRoutes.get("/getOurWorkImage", ourWorkImagesController.get);
module.exports = ourProgramRoutes;
