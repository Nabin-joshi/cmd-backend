const Resources = require("../models/Resources");
const catchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

exports.getResources = catchAsyncError(async (req, res, next) => {
  const locale = req.query.locale;
  const field = req.query.field;
  const projection = {
    [field]: 1, // Include field1
  };
  let resourcesObject = await Resources.findOne({}, projection);

  if (!resourcesObject) {
    resourcesObject = await new Resources().save();
  }
  res.status(200).json({ success: true, data: resourcesObject });
});

exports.updateGetResourcesField = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const resourceObject = await Resources.findOne({});
  const objectKeys = Object.keys(data);
  objectKeys.forEach((item) => {
    resourceObject[item] = data[item];
  });
  const updatedResourceObject = await resourceObject.save();
  res.status(200).json({ success: true, data: updatedResourceObject });
});
