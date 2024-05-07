const express = require("express");
const ourPartnersRouter = express.Router();
const ourPartnerController = require("../controller/ourPartnerController");
const auth = require("../middlewares/auth");
const getFileUploadMiddleware = require("../middlewares/fileUpload");

ourPartnersRouter.post(
  "/create/ourPartner",
  ourPartnerController.createOurPartner
);

ourPartnersRouter.get(
  "/getPartner/:locale",
  ourPartnerController.getOurPartner
);

ourPartnersRouter.get("/getAllPartner", ourPartnerController.getAllOurPartner);

ourPartnersRouter.delete(
  "/delete/partner/:locale",
  ourPartnerController.deleteOurPartner
);

ourPartnersRouter.put(
  "/updatePartner/:locale",
  getFileUploadMiddleware("public/images", [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
  ]).single("image"),
  ourPartnerController.updateOurPartner
);

ourPartnersRouter.put(
  "/update/partner/heading/:locale",
  ourPartnerController.updateOurPartnerHeading
);

module.exports = ourPartnersRouter;
