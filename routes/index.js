const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const blogRoutes = require("./blogRoutes");

// for login register and tokens
router.use("/auth", authRoutes);

// testing routes
router.use("/blog", blogRoutes);

module.exports = router;
