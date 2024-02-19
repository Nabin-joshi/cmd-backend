const multer = require("multer");
const CatchAsyncError = require("../utils/CatchAsyncError");
const theJourney = require("../models/theJourney");
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
    // Implement file filter logic if needed
    cb(null, true);
  },
});

exports.createTheJourneyHeading = CatchAsyncError(async (req, res, next) => {
  const { heading, headingNepali, subHeading, subHeadingNepali, color } =
    req.body;

  if (heading.trim() === "" && headingNepali.trim() === "") {
    return next(new ErrorHandler("Heading is required", 400));
  }

  const theJourneyHeading = await theJourney.findOneAndUpdate({}, req.body, {
    upsert: true,
    runValidators: true,
    new: true, // Return the modified document instead of the original
  });

  res.status(201).json({
    success: true,
    data: theJourneyHeading,
  });
});

exports.createTheJourneyContent = CatchAsyncError(async (req, res, next) => {
  const { date, dateNepali, desc, descNepali } = req.body;
  const journey = await theJourney.findOne();

  if (!journey) {
    return next(new ErrorHandler("Heading must be added first", 400));
  }

  journey.contents.push({
    date,
    dateNepali,
    desc,
    descNepali,
  });
  const savedTheJourney = await journey.save();

  res.status(201).json({ success: true, data: savedTheJourney });
});

exports.getAllTheJourney = CatchAsyncError(async (req, res, next) => {
  const journey = await theJourney.findOne();

  if (journey) {
    theJourney.contents.forEach((content) => {
      content.image = `${process.env.WEB_ADDRESS}:${process.env.port}/public/images/${content.image}`;
    });
  }

  res.status(200).json({ success: true, data: journey });
});

// Get all TheJourneys
exports.getAllTheJourneys = CatchAsyncError(async (req, res, next) => {
  const theJourneys = await theJourney.findOne();
  res.status(200).json({ success: true, data: theJourneys });
});

// Get single TheJourney by ID
exports.getTheJourneyById = CatchAsyncError(async (req, res, next) => {
  const theJourney = await theJourney.findById(req.params.id);
  if (!theJourney) {
    return res
      .status(404)
      .json({ success: false, error: "TheJourney not found" });
  }
  res.status(200).json({ success: true, data: theJourney });
});

// Update a TheJourney
exports.updateTheJourney = CatchAsyncError(async (req, res, next) => {
  const theJourney = await theJourney.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!theJourney) {
    return res
      .status(404)
      .json({ success: false, error: "TheJourney not found" });
  }
  res.status(200).json({ success: true, data: theJourney });
});

// Delete a TheJourney
exports.deleteTheJourney = CatchAsyncError(async (req, res, next) => {
  const theJourney = await theJourney.findByIdAndDelete(req.params.id);
  if (!theJourney) {
    return res
      .status(404)
      .json({ success: false, error: "TheJourney not found" });
  }
  res.status(200).json({ success: true, data: {} });
});
