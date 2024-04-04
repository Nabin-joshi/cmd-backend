const OurProgram = require("../models/OurProgram");
const catchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

exports.getOurProgram = catchAsyncError(async (req, res, next) => {
  const locale = req.query.locale;
  const field = req.query.field;
  const projection = {
    [field]: 1, // Include field1
  };
  let ourProgamObject = await OurProgram.findOne({}, projection);

  if (!ourProgamObject) {
    next(new ErrorHandler("no single obj found !!"));
  }
  res.status(200).json({ success: true, data: ourProgamObject });
});

exports.updateOurProgramField = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const ourProgramObject = await OurProgram.findOne({});
  const objectKeys = Object.keys(data);
  objectKeys.forEach((item) => {
    ourProgramObject[item] = data[item];
  });
  const updatedOurProgramObject = await ourProgramObject.save();
  res.status(200).json({ success: true, data: updatedOurProgramObject });
});
