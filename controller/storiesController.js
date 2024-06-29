const multer = require("multer");
const Stories = require("../models/stories ");
const CatchAsyncError = require("../utils/catchAsyncError");
const path = require("path");
const ErrorHandler = require("../utils/errorHandler");
const fs = require("fs");
const { BACKEND_SERVER_PATH } = require("../config/config");
const { deletepreviousPhotos } = require("../utils/fileHandling");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${process.env.FILE_PATH}/images`);
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
    eachStory.image = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
      imageName
    )}`;
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
  const objects = req.body;
  const storyTop = await Stories.findOne();
  objects.forEach((object, index) => {
    const matchedStory = storyTop.contents.find((story) =>
      story._id.equals(object._id)
    );
    if (matchedStory) {
      matchedStory.desc = object.desc;
      matchedStory.descNepali = object.descNepali;
      matchedStory.person = object.person;
      matchedStory.personNepali = object.personNepali;
      matchedStory.display = object.display;
      Object.assign(matchedStory, { ...object, image: matchedStory.image });

      // Check if newImage field is present
      if (object.newImage) {
        if (matchedStory.image) {
          const previousImagePath = `${process.env.FILE_PATH}/images/${matchedStory.image}`;
          try {
            fs.unlinkSync(previousImagePath);
          } catch (error) {
            console.log(fs);
          }
        }
        // Process and store the image
        const imageData = object.newImage.replace(
          /^data:image\/\w+;base64,/,
          ""
        );
        const imageBuffer = Buffer.from(imageData, "base64");
        const imagePath = `${process.env.FILE_PATH}/images/image_${object._id}.jpeg`; // Define the path to store the image
        fs.writeFileSync(imagePath, imageBuffer); // Write the image buffer to file
        matchedStory.image = imagePath.split("/").pop(); // Update the image field with the path to the stored image
      }
    }
  });

  const savedStatus = await storyTop.save();

  res.status(200).json({ success: true, data: savedStatus });
});

// Delete a Stories
exports.deleteStories = CatchAsyncError(async (req, res, next) => {
  const storiesId = req.params.id;
  const stories = await Stories.findOne();
  let contents = stories.contents.filter((bc) => {
    return !bc._id.equals(storiesId);
  });
  stories.contents = contents;
  await stories.save();
  res.status(200).json({ success: true, data: req.params.id });
});
