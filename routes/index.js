const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const blogRoutes = require("./blogRoutes");
const newsletterUser = require("../models/newsletterUser");
const newsLetterRouter = require("./newsLetterRoutes");
// for login register and tokens
router.use("/auth", authRoutes);

// testing routes
router.use("/blog", blogRoutes);

router.use("/newsLetter", newsLetterRouter);

module.exports = router;
