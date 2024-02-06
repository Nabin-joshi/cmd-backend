const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const blogRoutes = require("./blogRoutes");
const newsletterUser = require("../models/newsletterUser");
const newsLetterRouter = require("./newsLetterRoutes");
const serviceRouter = require("./CMS-Routes/serviceRoutes");
const sliderRoutes = require("./CMS-Routes/sliderRoutes");

// for login register and tokens
router.use("/auth", authRoutes);

// testing routes
router.use("/blog", blogRoutes);

router.use("/newsLetter", newsLetterRouter);

router.use("/service", serviceRouter);

router.use("/slider", sliderRoutes);

module.exports = router;
