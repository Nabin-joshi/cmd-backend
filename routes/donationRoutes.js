const express = require("express");
const donationRoutes = express.Router();
const donationController = require("../controller/donationController");
const getFileUploadMiddleware = require("../middlewares/fileUpload");

donationRoutes.put("", donationController.updateDonationFields);

donationRoutes.get("", donationController.getDonation);
donationRoutes.delete(
  "/deleteIconDesc/:id",
  donationController.deleteIconDescDonation
);

donationRoutes.put(
  "/update/donationImage",
  getFileUploadMiddleware("public/images", [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
  ]).single("image"),
  donationController.updateDonationImage
);

donationRoutes.get("/image", donationController.getDonationImage);

module.exports = donationRoutes;
