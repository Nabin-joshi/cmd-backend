const express = require("express");
const aboutUsRouter = express.Router();
const aboutUsController = require("../controller/AboutUsController");

aboutUsRouter.post("/broadCommittee", aboutUsController.createBroadCommitte);
aboutUsRouter.put("/broadCommittee", aboutUsController.updateAboutUsFields);
aboutUsRouter.put(
  "/updateAboutUsHeaderImage",
  aboutUsController.updateAboutUsFields
);

aboutUsRouter.get("/broadCommittee", aboutUsController.getAboutUs);
aboutUsRouter.delete(
  "/broadCommittee/:id",
  aboutUsController.deleteBoardCommitteeMembers
);
aboutUsRouter.delete(
  "/thematicAreas/:id",
  aboutUsController.deleteThematicAreas
);
module.exports = aboutUsRouter;
