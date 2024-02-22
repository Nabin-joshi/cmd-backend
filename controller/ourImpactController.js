const multer = require("multer");
const OurImpact = require("../models/ourImpact");
const CatchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const ourImpact = require("../models/ourImpact");

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

exports.createOurImpactHeading = CatchAsyncError(async (req, res, next) => {
  if (req.body.heading.trim() === "" && req.body.headingNepali.trim() === "") {
    return next(new ErrorHandler(" please provide heading ", 400));
  }
  const ourImpactHeading = await OurImpact.findOneAndUpdate({}, req.body, {
    upsert: true,
    runValidators: true,
  });
  res.status(201).json({
    success: true,
    data: ourImpactHeading,
  });
});
// Create a new OurImpact

exports.createOurImpactContents = [
  upload.single("icon"),
  CatchAsyncError(async (req, res, next) => {
    if (!req.file) {
      return next(new ErrorHandler(" Logo is required !!!", 400));
    }
    const { icon, ...ourImpactContent } = req.body;
    const iconPath = req.file.filename;
    const ourImpact = await OurImpact.findOne();
    if (ourImpact === undefined || ourImpact === null) {
      return next(new ErrorHandler(" Heading must be added !!", 400));
    }
    ourImpact.contents.push({ ...ourImpactContent, icon: iconPath });
    const savedOurImpact = await ourImpact.save();
    res.status(201).json({ success: true, data: savedOurImpact });
  }),
];

// Get all OurImpacts
exports.getAllOurImpacts = CatchAsyncError(async (req, res, next) => {
  const ourImpact = await OurImpact.findOne();
  if (ourImpact) {
    ourImpact.contents.map((eachImpact, index) => {
      let iconName = eachImpact.icon;
      eachImpact.icon = `${process.env.WEB_ADDRESS}:${process.env.port}/public/images/${iconName}`;
    });
  }
  res.status(200).json({ success: true, data: ourImpact });
});

// Get single OurImpact by ID
exports.getOurImpactById = CatchAsyncError(async (req, res, next) => {
  const ourImpact = await OurImpact.findById(req.params.id);
  if (!ourImpact) {
    return res
      .status(404)
      .json({ success: false, error: "OurImpact not found" });
  }
  res.status(200).json({ success: true, data: ourImpact });
});

// Update a OurImpact
exports.updateOurImpact = CatchAsyncError(async (req, res, next) => {
  const ourImpact = await OurImpact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!ourImpact) {
    return res
      .status(404)
      .json({ success: false, error: "OurImpact not found" });
  }
  res.status(200).json({ success: true, data: ourImpact });
});

// Delete a OurImpact
exports.deleteOurImpact = CatchAsyncError(async (req, res, next) => {
  const ourImpact = await OurImpact.findByIdAndDelete(req.params.id);
  if (!ourImpact) {
    return res
      .status(404)
      .json({ success: false, error: "OurImpact not found" });
  }
  res.status(200).json({ success: true, data: {} });
});
