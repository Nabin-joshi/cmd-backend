const express = require("express");
const {
  addFooterDetails,
  getFooterById,
  updateFooter,
  deleteFooter,
} = require("../controller/footerController");

const footerRouter = express.Router();

footerRouter
  .route("/footer")
  .post(addFooterDetails)
  .get(getFooterById)
  .put(updateFooter)
  .delete(deleteFooter);

module.exports = footerRouter;
