const express = require("express");
const ourProgramRoutes = express.Router();
const ourProgramController = require("../controller/ourProgramController");

// ourProgramRoutes.post("/resources", ourProgramController.createBroadCommitte);
ourProgramRoutes.put("", ourProgramController.updateOurProgramField);
ourProgramRoutes.get("", ourProgramController.getOurProgram);
// ourProgramRoutes.delete(
//   "/resources/:id",
//   ourProgramController.deleteBoardCommitteeMembers
// );
// ourProgramRoutes.delete("/resources/:id", ourProgramController.deleteThematicAreas);
module.exports = ourProgramRoutes;
