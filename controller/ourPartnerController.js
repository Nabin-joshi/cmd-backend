const multer = require("multer");
const OurPartner = require("../models/ourPartner");
const CatchAsyncError = require("../utils/catchAsyncError");
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

exports.createOurPartnerHeading = CatchAsyncError(async (req, res, next) => {
  if (!req.body.heading && !req.body.headingNepali) {
    return next(
      new ErrorHandler("Heading and Heading Nepali are required", 400)
    );
  }

  const ourPartnerHeading = await OurPartner.findOneAndUpdate({}, req.body, {
    upsert: true,
    runValidators: true,
    new: true, // Return the modified document instead of the original
  });

  res.status(201).json({
    success: true,
    data: ourPartnerHeading,
  });
});

exports.createOurPartnerContent = [
  upload.single("icon"),
  CatchAsyncError(async (req, res, next) => {
    if (!req.file) {
      return next(new ErrorHandler("Icon is required", 400));
    }

    const iconPath = req.file.filename;
    const ourPartner = await OurPartner.findOne();

    if (!ourPartner) {
      return next(new ErrorHandler("Heading must be added first", 400));
    }

    ourPartner.contents.push({ icon: iconPath });
    const savedOurPartner = await ourPartner.save();

    res.status(201).json({ success: true, data: savedOurPartner });
  }),
];

exports.getAllOurPartners = CatchAsyncError(async (req, res, next) => {
  const ourPartner = await OurPartner.findOne();

  if (ourPartner) {
    ourPartner.contents.forEach((content) => {
      content.icon = `${process.env.WEB_ADDRESS}:${process.env.port}/public/images/${content.icon}`;
    });
  }

  res.status(200).json({ success: true, data: ourPartner });
});

// Create a new OurPartner
exports.createOurPartner = CatchAsyncError(async (req, res, next) => {
  const ourPartner = await OurPartner.create(req.body);
  res.status(201).json({ success: true, data: ourPartner });
});

// Get all OurPartners

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
const fs = require("fs");
// Update a OurPartner
exports.updateOurPartner = CatchAsyncError(async (req, res, next) => {
  try {
    const objects = req.body;
    const partnerTop = await OurPartner.findOne();
    objects.forEach((object) => {
      const matchedPartner = partnerTop.contents.find((value) => {
        return value._id.equals(object._id);
      });
      if (matchedPartner) {
        if (object.newIcon) {
          if (matchedPartner.icon) {
            const previousIconPath = `${process.env.FILE_PATH}/images/${matchedPartner.icon}`;
            try {
              fs.unlinkSync(previousIconPath);
            } catch (error) {
              console.error("Error removing previous image: ", error);
            }
          }

          const iconData = object.newIcon.replace(
            /^data:image\/\w+;base64,/,
            ""
          );
          const iconBuffer = Buffer.from(iconData, "base64");
          const iconPath = `${process.env.FILE_PATH}/images/icon_${object._id}.jpeg`;
          fs.writeFileSync(iconPath, iconBuffer);
          matchedPartner.icon = iconPath.split("/").pop();
        }
      }
    });
    const savedPartner = await partnerTop.save();
    res.status(200).json({ success: true, data: savedPartner });
  } catch (error) {
    console.error("Error updating partner values: ", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
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
