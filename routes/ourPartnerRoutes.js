const express = require("express");
const ourPartnersRouter = express.Router();
const ourPartnerController = require("../controller/ourPartnerController");
const auth = require("../middlewares/auth");
ourPartnersRouter.post(
  "/heading",
  ourPartnerController.createOurPartnerHeading
);
ourPartnersRouter.post(
  "/contents",
  ourPartnerController.createOurPartnerContent
);

// get all
ourPartnersRouter.get("/all", ourPartnerController.getAllOurPartners);

// get blog by id
ourPartnersRouter.get("/:id", ourPartnerController.getOurPartnerById);

// update
ourPartnersRouter.put("/update/:id", ourPartnerController.updateOurPartner);

// delete
ourPartnersRouter.delete("/:id", auth, ourPartnerController.deleteOurPartner);

module.exports = ourPartnersRouter;
