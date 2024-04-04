const contactUs = require("../models/contactUs");
const getInTouch = require("../models/getInTouch");
const catchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const fs = require("fs");
const { deletepreviousPhotos, storeImage } = require("../utils/fileHandling");

exports.getContactUs = catchAsyncError(async (req, res, next) => {
  const locale = req.query.locale;
  const field = req.query.field;
  let ourProgamObject;
  if (field.trim() === "") {
    ourProgamObject = await contactUs.findOne({});
  } else {
    const projection = {
      [field]: 1, // Include field1
    };
    ourProgamObject = await contactUs.findOne({}, projection);
  }

  if (!ourProgamObject) {
    next(new ErrorHandler("no single obj found !!"));
  }
  ourProgamObject.headerImage = `${process.env.WEB_ADDRESS}:${process.env.PORT}/public/images/${ourProgamObject.headerImage}`;
  res.status(200).json({ success: true, data: ourProgamObject });
});

exports.updateContactUsField = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const contactUsObj = await contactUs.findOne({});
  if (data.newHeaderImage) {
    if (contactUsObj.headerImage) {
      deletepreviousPhotos(contactUsObj.headerImage);
    }

    data.headerImage = storeImage(data.newHeaderImage, data._id);
  }

  const objectKeys = Object.keys(data);
  objectKeys.forEach((item) => {
    contactUsObj[item] = data[item];
  });
  const updateContactUsObj = await contactUsObj.save();
  res.status(200).json({ success: true, data: updateContactUsObj });
});

exports.createGetInTouch = catchAsyncError(async (req, res, next) => {
  const obj = req.body;
  if (
    obj.name.trim() === "" ||
    obj.email.trim() === "" ||
    obj.message.trim() === ""
  ) {
    return next(new ErrorHandler("missing fields !!!"));
  }
  const createdGetInTouch = await getInTouch.create(obj);
  res.status(201).json({ success: true, data: createdGetInTouch._id });
});

exports.getGetInTouch = catchAsyncError(async (req, res, next) => {
  const getInTouchInfos = await getInTouch.find().sort({ _id: -1 });
  res.status(200).json({ success: true, data: getInTouchInfos });
});
