const donation = require("../models/donation");
const catchAsyncError = require("../utils/catchAsyncError");
const CatchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const fs = require("fs");
const {
  deletepreviousPhotos,
  storeImage,
  randomNumberGenerator,
  getImageUrl,
} = require("../utils/fileHandling");
const { donateUs } = require("./newsLetterController");
const { request } = require("http");
const { BACKEND_SERVER_PATH } = require("../config/config");

exports.updateDonationFields = CatchAsyncError(async (req, res, next) => {
  const data = req.body;
  const donationObj = await donation.findOne({});

  Object.keys(data).forEach(async (key) => {
    if (key === "iconDescs") {
      let fileName;
      const { icon, description, descriptionNepali } = data[key];
      if (icon !== undefined || icon !== null) {
        fileName = storeImage(icon);
      }
      const newIconDescObj = { icon: fileName, description, descriptionNepali };
      donationObj.iconDescs.push(newIconDescObj);
    } else {
      donationObj[key] = data[key];
    }
  });

  const savedDonationObj = await donationObj.save();
  res.status(200).json({ success: true, data: savedDonationObj });
});

exports.getDonation = CatchAsyncError(async (req, res, next) => {
  const locale = req.query.locale;
  const field = req.query.field;
  const projection = {
    [field]: 1, // Include field1
  };
  let donationObj = await donation.findOne({}, projection);
  if (field === "iconDescs") {
    donationObj.iconDescs.forEach((bc, index) => {
      bc.icon = getImageUrl(bc.icon);
    });
  }
  if (donationObj.image && donationObj.image !== "") {
    donationObj.image = getImageUrl(donationObj.image);
  }
  res.status(200).json({ success: true, data: donationObj });
});

exports.deleteIconDescDonation = catchAsyncError(async (req, res, next) => {
  const iconDescId = req.params.id;
  const donationObj = await donation.findOne();
  let iconDescs = donationObj.iconDescs.filter((icdesc) => {
    const id1 = icdesc._id;
    const id2 = iconDescId;
    const st = id1 === id2;
    if (icdesc._id.equals(iconDescId)) {
      deletepreviousPhotos(icdesc.icon);
    }
    return !icdesc._id.equals(iconDescId);
  });
  donationObj.iconDescs = iconDescs;
  await donationObj.save();
  res.status(200).json({ success: true, data: iconDescId });
});

exports.updateDonationImage = catchAsyncError(async (req, res, next) => {
  try {
    const donationObj = await donation.findOne({});
    if (req.file) {
      donationObj.image = req.file.filename;
      await donationObj.save();
      return res.status(200).json({ msg: "Image added successfully" });
    } else {
      return res.status(200).json({ msg: "Image added successfully" });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

exports.getDonationImage = catchAsyncError(async (req, res, next) => {
  try {
    const donationObj = await donation.findOne({});
    if (donationObj.image && donationObj.image !== "") {
      donationObj.image = `${BACKEND_SERVER_PATH}/public/images/${donationObj.image}`;
    }
    return res.status(200).json({ image: donationObj.image });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});
