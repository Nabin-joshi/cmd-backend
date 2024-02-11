const OurPartner = require("../models/ourPartner");
const CatchAsyncError = require("../utils/CatchAsyncError");

// Create a new OurPartner
exports.createOurPartner = CatchAsyncError(async (req, res, next) => {
  const ourPartner = await OurPartner.create(req.body);
  res.status(201).json({ success: true, data: ourPartner });
});

// Get all OurPartners
exports.getAllOurPartners = CatchAsyncError(async (req, res, next) => {
  const ourPartners = await OurPartner.find();
  res.status(200).json({ success: true, data: ourPartners });
});

// Get single OurPartner by ID
exports.getOurPartnerById = CatchAsyncError(async (req, res, next) => {
  const ourPartner = await OurPartner.findById(req.params.id);
  if (!ourPartner) {
    return res
      .status(404)
      .json({ success: false, error: "OurPartner not found" });
  }
  res.status(200).json({ success: true, data: ourPartner });
});

// Update a OurPartner
exports.updateOurPartner = CatchAsyncError(async (req, res, next) => {
  const ourPartner = await OurPartner.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!ourPartner) {
    return res
      .status(404)
      .json({ success: false, error: "OurPartner not found" });
  }
  res.status(200).json({ success: true, data: ourPartner });
});

// Delete a OurPartner
exports.deleteOurPartner = CatchAsyncError(async (req, res, next) => {
  const ourPartner = await OurPartner.findByIdAndDelete(req.params.id);
  if (!ourPartner) {
    return res
      .status(404)
      .json({ success: false, error: "OurPartner not found" });
  }
  res.status(200).json({ success: true, data: {} });
});
