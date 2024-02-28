const OurValues = require("../models/ourValues");
const CatchAsyncError = require("../utils/catchAsyncError");
const fs = require("fs");

const multer = require("multer");
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

exports.createOurValuesHeading = CatchAsyncError(async (req, res, next) => {
  if (req.body.heading.trim() === "" && req.body.headingNepali.trim() === "") {
    return next(new ErrorHandler("Please provide heading", 400));
  }
  const ourValuesHeading = await OurValues.findOneAndUpdate({}, req.body, {
    upsert: true,
    runValidators: true,
  });
  res.status(201).json({
    success: true,
    data: ourValuesHeading,
  });
});

exports.createOurValuesContents = [
  upload.single("icon"),
  CatchAsyncError(async (req, res, next) => {
    if (!req.file) {
      return next(new ErrorHandler("Icon is required!!!", 400));
    }
    const { icon, ...ourValuesContent } = req.body;
    const iconPath = req.file.filename;
    const ourValues = await OurValues.findOne();
    if (ourValues === undefined || ourValues === null) {
      return next(new ErrorHandler("Heading must be added!!", 400));
    }
    ourValues.contents.push({ ...ourValuesContent, icon: iconPath });
    const savedOurValues = await ourValues.save();
    res.status(201).json({ success: true, data: savedOurValues });
  }),
];

exports.getAllOurValues = CatchAsyncError(async (req, res, next) => {
  const ourValues = await OurValues.findOne();
  ourValues.contents.map((eachValue) => {
    let iconName = eachValue.icon;
    eachValue.icon = `${process.env.WEB_ADDRESS}:${process.env.PORT}/public/images/${iconName}`;
  });
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

exports.updateOurValues = async (req, res, next) => {
  try {
    const objects = req.body;
    const ourValuesTop = await OurValues.findOne();

    objects.forEach((object) => {
      const matchedValue = ourValuesTop.contents.find((value) =>
        value._id.equals(object._id)
      );

      if (matchedValue) {
        matchedValue.title = object.title;
        matchedValue.titleNepali = object.titleNepali;

        // Check if newIcon field is present
        if (object.newIcon) {
          if (matchedValue.icon) {
            const previousImagePath = `${process.env.FILE_PATH}/images/${matchedValue.icon}`;
            try {
              fs.unlinkSync(previousImagePath);
            } catch (error) {
              console.error("Error removing previous image:", error);
            }
          }

          // Process and store the icon
          const iconData = object.newIcon.replace(
            /^data:image\/\w+;base64,/,
            ""
          );
          const iconBuffer = Buffer.from(iconData, "base64");
          const iconPath = `${process.env.FILE_PATH}/images/icon_${object._id}.jpeg`;
          fs.writeFileSync(iconPath, iconBuffer);
          matchedValue.icon = iconPath.split("/").pop();
        }
      }
    });

    const savedStatus = await ourValuesTop.save();

    res.status(200).json({ success: true, data: savedStatus });
  } catch (error) {
    console.error("Error updating our values:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

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
