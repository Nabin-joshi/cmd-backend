const express = require("express");
const contactUsRoutes = express.Router();
const contactUsController = require("../controller/contactUsControler");

contactUsRoutes.post("/getInTouch", contactUsController.createGetInTouch);
contactUsRoutes.get("/getInTouch", contactUsController.getGetInTouch);
contactUsRoutes.put("", contactUsController.updateContactUsField);
contactUsRoutes.get("", contactUsController.getContactUs);
// contactUsRoutes.delete(
//   "/resources/:id",
//   contactUsController.deleteBoardCommitteeMembers
// );
// contactUsRoutes.delete("/resources/:id", contactUsController.deleteThematicAreas);
module.exports = contactUsRoutes;
