const express = require("express");
const getInvolvedRouter = express.Router();
const getInvolvedController = require("../controller/getInvolvedController");
const getInvolvedImagesController = require("../controller/CMSControllers/getInvolvedImagesController");
const vacancyController = require("../controller/CMSControllers/vacancyController");
const volenteerController = require("../controller/CMSControllers/volenteerController");
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

// Vacancy
getInvolvedRouter.post("/developer/create/vacancy", vacancyController.create);

getInvolvedRouter.get("/getAllVacancy", vacancyController.getAll);

getInvolvedRouter.put("/update/vacancy/:locale", vacancyController.update);

getInvolvedRouter.delete("/delete/vacancy/:locale", vacancyController.delete);

getInvolvedRouter.get("/getVacancy/:locale", vacancyController.get);

// Volenteer
getInvolvedRouter.post(
  "/developer/create/volenteer",
  volenteerController.create
);

getInvolvedRouter.get("/getAllVolenteer", volenteerController.getAll);

getInvolvedRouter.put("/update/volenteer/:locale", volenteerController.update);

getInvolvedRouter.delete(
  "/delete/volenteer/:locale",
  volenteerController.delete
);

getInvolvedRouter.get("/getVolenteer/:locale", volenteerController.get);

module.exports = getInvolvedRouter;
