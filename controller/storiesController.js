const multer = require("multer");
const Stories = require("../models/stories ");
const CatchAsyncError = require("../utils/catchAsyncError");
const path = require("path");
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

exports.createStoryHeading = CatchAsyncError(async (req, res, next) => {
  // const resultDeleted = await Stories.deleteMany({});
  if (req.body.heading.trim() === "" && req.body.headingNepali.trim() === "") {
    return next(new ErrorHandler("heading must not be empty ", 400));
  }
  const createdStoryHeading = await Stories.findOneAndUpdate({}, req.body, {
    upsert: true,
    runValidators: true,
  });
  // const createdStoryHeading = await Stories.create(req.body);
  // return next(new Error("some thing went wriong", 400));
  res.status(201).json({
    success: true,
    data: createdStoryHeading,
  });
});

// Create a new Stories
exports.createStories = [
  upload.single("image"),
  CatchAsyncError(async (req, res, next) => {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, errorMessage: "No file uploaded" });
    }
    const { image, ...storyObj } = req.body;
    const imagePath = req.file.filename;
    const singleStory = await Stories.findOne();
    if (singleStory === null || singleStory === undefined) {
      // return next(new ErrorHandler("Story Heading must be added first ", 401));
      return res
        .status(404)
        .json({ success: false, errorMessage: "Story Heading must be added" });
    }
    // const newContents = [...singleStory.contents, { ...storyObj, image: imagePath }]
    singleStory.contents.push({ ...storyObj, image: imagePath });
    const savedStories = await singleStory.save();
    res.status(201).json({ success: true, data: savedStories });
  }),
];

exports.getStoriesHeading = CatchAsyncError(async (req, res, next) => {
  const allStoriesHeading = await Stories.find();
  let storyHeading;
  if (allStoriesHeading.length > 0) {
    storyHeading = allStoriesHeading[0];
  }
  res.status(200).json({ success: true, data: storyHeading });
});

// Get all Stories
exports.getAllStories = CatchAsyncError(async (req, res, next) => {
  let pathd = path.join(__dirname, "public/images");
  const stories = await Stories.findOne();
  stories.contents.map((eachStory, index) => {
    let imageName = eachStory.image.split("\\").pop();
    eachStory.image = `${process.env.WEB_ADDRESS}:${process.env.port}/public/images/${imageName}`;
  });
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
