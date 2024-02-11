const TheJourney = require("../models/theJourney");
const CatchAsyncError = require("../utils/CatchAsyncError");

// Create a new TheJourney
exports.createTheJourney = CatchAsyncError(async (req, res, next) => {
  const theJourney = await TheJourney.create(req.body);
  res.status(201).json({ success: true, data: theJourney });
});

// Get all TheJourneys
exports.getAllTheJourneys = CatchAsyncError(async (req, res, next) => {
  const theJourneys = await TheJourney.find();
  res.status(200).json({ success: true, data: theJourneys });
});

// Get single TheJourney by ID
exports.getTheJourneyById = CatchAsyncError(async (req, res, next) => {
  const theJourney = await TheJourney.findById(req.params.id);
  if (!theJourney) {
    return res
      .status(404)
      .json({ success: false, error: "TheJourney not found" });
  }
  res.status(200).json({ success: true, data: theJourney });
});

// Update a TheJourney
exports.updateTheJourney = CatchAsyncError(async (req, res, next) => {
  const theJourney = await TheJourney.findByIdAndUpdate(
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
  const theJourney = await TheJourney.findByIdAndDelete(req.params.id);
  if (!theJourney) {
    return res
      .status(404)
      .json({ success: false, error: "TheJourney not found" });
  }
  res.status(200).json({ success: true, data: {} });
});
