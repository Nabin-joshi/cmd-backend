const express = require("express");
const footerRouter = express.Router();
const footer = require("../controller/footerController");
const auth = require("../middlewares/auth");

footerRouter.post("", footer.addFooterDetails);
// get all
footerRouter.get("", footer.getFooter);

module.exports = footerRouter;
