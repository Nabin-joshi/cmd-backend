const express = require("express");
const getInvolvedRouter = express.Router();
const getInvolvedController = require("../controller/getInvolvedController");

// getInvolvedRouter.post("/resources", resourceController.createBroadCommitte);
getInvolvedRouter.put("", getInvolvedController.updateGetInvolvedField);
getInvolvedRouter.get("", getInvolvedController.getInvolvedData);
// getInvolvedRouter.delete(
//   "/resources/:id",
//   resourceController.deleteBoardCommitteeMembers
// );
// getInvolvedRouter.delete("/resources/:id", resourceController.deleteThematicAreas);
module.exports = getInvolvedRouter;
