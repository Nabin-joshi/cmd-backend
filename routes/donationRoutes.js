const express = require("express");
const donationRoutes = express.Router();
const donationController = require("../controller/donationController");

donationRoutes.put("", donationController.updateDonationFields);

donationRoutes.get("", donationController.getDonation);
donationRoutes.delete(
  "/deleteIconDesc/:id",
  donationController.deleteIconDescDonation
);

module.exports = donationRoutes;
