const DonationDetail = require("../../models/CMSModels/donationDetail");
const DonationUserDetail = require("../../models/CMSModels/donationUserDetail");

const getDonationDetail = async (req, res, next) => {
  try {
    let donationDetails = await DonationDetail.find();
    return res.status(200).json(donationDetails);
  } catch (err) {
    return next(err);
  }
};
const getDonationUserDetail = async (req, res, next) => {
  try {
    let donationUserDetails = await DonationUserDetail.find();
    return res.status(200).json(donationUserDetails);
  } catch (err) {
    return next(err);
  }
};

const donationDetailController = {
  getDonationDetail,
  getDonationUserDetail,
};
module.exports = donationDetailController;
