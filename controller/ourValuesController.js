const OurValues = require("../models/ourValues");
const CatchAsyncError = require("../utils/CatchAsyncError");

// Create a new OurValues
exports.createOurValues = CatchAsyncError(async (req, res, next) => {
  const ourValues = await OurValues.create(req.body);
  res.status(201).json({ success: true, data: ourValues });
});

// Get all OurValues
exports.getAllOurValues = CatchAsyncError(async (req, res, next) => {
  const ourValues = await OurValues.find();
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
