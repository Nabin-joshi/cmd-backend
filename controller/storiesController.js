const Stories = require("../models/stories ");
const CatchAsyncError = require("../utils/CatchAsyncError");

// Create a new Stories
exports.createStories = CatchAsyncError(async (req, res, next) => {
  const stories = await Stories.create(req.body);
  res.status(201).json({ success: true, data: stories });
});

// Get all Stories
exports.getAllStories = CatchAsyncError(async (req, res, next) => {
  const stories = await Stories.find();
  res.status(200).json({ success: true, data: stories });
});

// Get single Stories by ID
exports.getStoriesById = CatchAsyncError(async (req, res, next) => {
  const stories = await Stories.findById(req.params.id);
  if (!stories) {
    return res.status(404).json({ success: false, error: "Stories not found" });
  }
  res.status(200).json({ success: true, data: stories });
});

// Update a Stories
exports.updateStories = CatchAsyncError(async (req, res, next) => {
  const stories = await Stories.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!stories) {
    return res.status(404).json({ success: false, error: "Stories not found" });
  }
  res.status(200).json({ success: true, data: stories });
});

// Delete a Stories
exports.deleteStories = CatchAsyncError(async (req, res, next) => {
  const stories = await Stories.findByIdAndDelete(req.params.id);
  if (!stories) {
    return res.status(404).json({ success: false, error: "Stories not found" });
  }
  res.status(200).json({ success: true, data: {} });
});
