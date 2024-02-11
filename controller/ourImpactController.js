const OurImpact = require("../models/ourImpact");
const CatchAsyncError = require("../utils/CatchAsyncError");

// Create a new OurImpact
exports.createOurImpact = CatchAsyncError(async (req, res, next) => {
  const ourImpact = await OurImpact.create(req.body);
  res.status(201).json({ success: true, data: ourImpact });
});

// Get all OurImpacts
exports.getAllOurImpacts = CatchAsyncError(async (req, res, next) => {
  const ourImpacts = await OurImpact.find();
  res.status(200).json({ success: true, data: ourImpacts });
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
