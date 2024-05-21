const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const blogRoutes = require("./blogRoutes");
const footerRouter = require("./footerRoutes");
const newsletterUser = require("../models/newsletterUser");
const newsLetterRouter = require("./newsLetterRoutes");
const ourImpactRoutes = require("./ourImpactRoutes");
const storiesRouter = require("./storiesRoutes");
const theJourneyRouter = require("./theJourneyRoutes");
const ourPartnersRouter = require("./ourPartnerRoutes");
const ourValuesRouter = require("./ourValuesRoutes");
const serviceRouter = require("./CMS-Routes/serviceRoutes");
const sliderRoutes = require("./CMS-Routes/sliderRoutes");
const ourworkRoutes = require("./CMS-Routes/ourworkRoutes");
const geographicalCoverageRoutes = require("./CMS-Routes/geographicalCoverageRoutes");
const yourSupportRoutes = require("./CMS-Routes/yourSupportRoutes");
const aboutUsRouter = require("./aboutUsRoutes");
const resourceRouter = require("./resourceRoutes");
const { getInvolvedData } = require("../controller/getInvolvedController");
const getInvolvedRouter = require("./getInvolvedRoutes");
const ourProgramRoutes = require("./ourProgramRoutes");
const contactUsRoutes = require("./contactUsRoutes");
const latestNewsRoutes = require("./CMS-Routes/latestNewsRoutes");
const donationRoutes = require("./donationRoutes");
const socialLinkRoutes = require("./CMS-Routes/socialLinksRoutes");
const popupPageRoutes = require("./CMS-Routes/popupPageRoutes");
const mentalHelathRoutes = require("./CMS-Routes/mentalHealthRoutes");
const strategicPlanRoutes = require("./CMS-Routes/ourStrategicPlanRoutes");
const footerLinksPageRoutes = require("./CMS-Routes/footerLinksPagesRoutes");
const needHelpRoutes = require("./CMS-Routes/needHelpRoutes");
const brandingRoutes = require("./CMS-Routes/brandingRoutes");

// for login register and tokens
router.use("/auth", authRoutes);

// testing routes
router.use("/blog", blogRoutes);

router.use("/newsLetter", newsLetterRouter);
router.use("/oI", ourImpactRoutes);
router.use("/footer", footerRouter);
router.use("/ourImpacts", ourImpactRoutes);
router.use("/ourPartners", ourPartnersRouter);
router.use("/ourvalues", ourValuesRouter);
router.use("/stories", storiesRouter);
router.use("/thejourney", theJourneyRouter);
router.use("/aboutUs", aboutUsRouter);
router.use("/service", serviceRouter);
router.use("/slider", sliderRoutes);
router.use("/ourwork", ourworkRoutes);
router.use("/geographicalCoverage", geographicalCoverageRoutes);
router.use("/yoursupport", yourSupportRoutes);
router.use("/resources", resourceRouter);
router.use("/getInvolved", getInvolvedRouter);
router.use("/ourProgram", ourProgramRoutes);
router.use("/contactUs", contactUsRoutes);
router.use("/latestNews", latestNewsRoutes);
router.use("/donation", donationRoutes);
router.use("/socialLinks", socialLinkRoutes);
router.use("/popup", popupPageRoutes);
router.use("/mentalHealth", mentalHelathRoutes);
router.use("/strategicPlan", strategicPlanRoutes);
router.use("/footerLinks", footerLinksPageRoutes);
router.use("/needhelp", needHelpRoutes);
router.use("/branding", brandingRoutes);

module.exports = router;
