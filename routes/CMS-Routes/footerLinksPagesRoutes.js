const router = require("express").Router();
const footerLinksPageController = require("../../controller/CMSControllers/footerLinksPageController");
const auth = require("../../middlewares/auth");

// FAQ

router.post("/developer/create/FAQ", footerLinksPageController.createFAQ);

router.get("/getFAQ/:locale", footerLinksPageController.getFAQ);

router.get("/getAllFAQ", footerLinksPageController.getAllFAQ);

router.put("/updateFAQ/:locale", footerLinksPageController.updateFAQ);

// Terms of Servcie

router.post(
  "/developer/create/termsOfService",
  footerLinksPageController.createTermsOfService
);

router.get(
  "/getTermsOfService/:locale",
  footerLinksPageController.getTermsOfservice
);

router.get(
  "/getAllTermsOfService",
  footerLinksPageController.getAllTermsOfService
);

router.put(
  "/updateTermsOfService/:locale",
  footerLinksPageController.updateTermsOfService
);

// Privacy Policy

router.post(
  "/developer/create/privacyPolicy",
  footerLinksPageController.createPrivacyPolicy
);

router.get(
  "/getPrivacyPolicy/:locale",
  footerLinksPageController.getPrivacyPolicy
);

router.get(
  "/getAllPrivacyPolicy",
  footerLinksPageController.getAllPrivacyPolicy
);

router.put(
  "/updatePrivacyPolicy/:locale",
  footerLinksPageController.updatePrivacyPolicy
);

module.exports = router;
