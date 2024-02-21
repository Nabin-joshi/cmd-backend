const OurValues = require("../models/ourValues");
const CatchAsyncError = require("../utils/CatchAsyncError");

const multer = require("multer");
const ErrorHandler = require("../utils/errorHandler");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${process.env.FILE_PATH}\\images`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    return cb(null, true);
  },
});

exports.createOurValuesHeading = CatchAsyncError(async (req, res, next) => {
  if (req.body.heading.trim() === "" && req.body.headingNepali.trim() === "") {
    return next(new ErrorHandler("Please provide heading", 400));
  }
  const ourValuesHeading = await OurValues.findOneAndUpdate({}, req.body, {
    upsert: true,
    runValidators: true,
  });
  res.status(201).json({
    success: true,
    data: ourValuesHeading,
  });
});

exports.createOurValuesContents = [
  upload.single("icon"),
  CatchAsyncError(async (req, res, next) => {
    if (!req.file) {
      return next(new ErrorHandler("Icon is required!!!", 400));
    }
    const { icon, ...ourValuesContent } = req.body;
    const iconPath = req.file.filename;
    const ourValues = await OurValues.findOne();
    if (ourValues === undefined || ourValues === null) {
      return next(new ErrorHandler("Heading must be added!!", 400));
    }
    ourValues.contents.push({ ...ourValuesContent, icon: iconPath });
    const savedOurValues = await ourValues.save();
    res.status(201).json({ success: true, data: savedOurValues });
  }),
];

exports.getAllOurValues = CatchAsyncError(async (req, res, next) => {
  const ourValues = await OurValues.findOne();
  ourValues.contents.map((eachValue) => {
    let iconName = eachValue.icon;
    eachValue.icon = `${process.env.WEB_ADDRESS}:${process.env.PORT}/public/images/${iconName}`;
  });
  res.status(200).json({ success: true, data: ourValues });
});

// Get single OurValues by ID
exports.getOurValuesById = CatchAsyncError(async (req, res, next) => {
  const ourValues = await OurValues.findById(req.params.id);
  if (!ourValues) {
    return res
      .status(404)
      .json({ success: false, error: "OurValues not found" });
  }
  res.status(200).json({ success: true, data: ourValues });
});

// Update a OurValues
exports.updateOurValues = CatchAsyncError(async (req, res, next) => {
  const ourValues = await OurValues.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!ourValues) {
    return res
      .status(404)
      .json({ success: false, error: "OurValues not found" });
  }
  res.status(200).json({ success: true, data: ourValues });
});

// Delete a OurValues
exports.deleteOurValues = CatchAsyncError(async (req, res, next) => {
  const ourValues = await OurValues.findByIdAndDelete(req.params.id);
  if (!ourValues) {
    return res
      .status(404)
      .json({ success: false, error: "OurValues not found" });
  }
  res.status(200).json({ success: true, data: {} });
});
