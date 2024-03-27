const GetInvolved = require("../models/GetInvolved");
const catchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

exports.getInvolvedData = catchAsyncError(async (req, res, next) => {
  const locale = req.query.locale;
  const field = req.query.field;
  const projection = {
    [field]: 1, // Include field1
  };
  let getInvolvedObject = await GetInvolved.findOne({}, projection);

  if (!getInvolvedObject) {
    getInvolvedObject = await new GetInvolved().save();
  }
  res.status(200).json({ success: true, data: getInvolvedObject[field] });
});

exports.updateGetInvolvedField = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const getInvolvedObject = await GetInvolved.findOne({});
  const objectKeys = Object.keys(data);
  objectKeys.forEach((item) => {
    getInvolvedObject[item] = data[item];
  });
  const updatedGetInvolvedObject = await getInvolvedObject.save();
  res
    .status(200)
    .json({ success: true, data: updatedGetInvolvedObject["_id"] });
});
