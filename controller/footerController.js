const Footer = require("../models/footer");
const CatchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

exports.addFooterDetails = CatchAsyncError(async (req, res, next) => {
  const footer = await Footer.findOneAndUpdate({}, req.body, {
    upsert: true,
    runValidators: true,
  });
  res.status(201).json({
    success: true,
    data: footer,
  });
});

// Get single Footer by ID
exports.getFooter = CatchAsyncError(async (req, res) => {
  const footer = await Footer.findOne();

  res.status(200).json({ success: true, data: footer });
});

// Update a Footer
exports.updateFooter = async (req, res) => {
  try {
    const footer = await Footer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!footer) {
      return res
        .status(404)
        .json({ success: false, error: "Footer not found" });
    }
    res.status(200).json({ success: true, data: footer });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Delete a Footer
exports.deleteFooter = async (req, res) => {
  try {
    const footer = await Footer.findByIdAndDelete(req.params.id);
    if (!footer) {
      return res
        .status(404)
        .json({ success: false, error: "Footer not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
