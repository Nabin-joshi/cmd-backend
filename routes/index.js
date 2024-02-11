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

// for login register and tokens
router.use("/auth", authRoutes);

// testing routes
router.use("/blog", blogRoutes);

router.use("/newsLetter", newsLetterRouter);
router.use("/foot", footerRouter);
router.use("/oI", ourImpactRoutes);
router.use("/footerRoutes", footerRouter);
router.use("/ourImpacts", ourImpactRoutes);
router.use("/ourPartnerRoutes", ourPartnersRouter);
router.use("/ourValuesRoutes", ourValuesRouter);
router.use("/stories", storiesRouter);
router.use("/theJourney", theJourneyRouter);

router.use("/service", serviceRouter);

router.use("/slider", sliderRoutes);

module.exports = router;
