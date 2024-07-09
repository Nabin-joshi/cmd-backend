const multer = require("multer");
const OurImpact = require("../models/ourImpact");
const CatchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const ourImpact = require("../models/ourImpact");
const fs = require("fs");
const { BACKEND_SERVER_PATH } = require("../config/config");
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

exports.createOurImpactHeading = CatchAsyncError(async (req, res, next) => {
  if (req.body.heading.trim() === "" && req.body.headingNepali.trim() === "") {
    return next(new ErrorHandler(" please provide heading ", 400));
  }
  const ourImpactHeading = await OurImpact.findOneAndUpdate({}, req.body, {
    upsert: true,
    runValidators: true,
  });
  res.status(201).json({
    success: true,
    data: ourImpactHeading,
  });
});
// Create a new OurImpact

exports.createOurImpactContents = [
  upload.single("icon"),
  CatchAsyncError(async (req, res, next) => {
    if (!req.file) {
      return next(new ErrorHandler(" Logo is required !!!", 400));
    }
    const { icon, ...ourImpactContent } = req.body;
    const iconPath = req.file.filename;
    const ourImpact = await OurImpact.findOne();
    if (ourImpact === undefined || ourImpact === null) {
      return next(new ErrorHandler(" Heading must be added !!", 400));
    }
    ourImpact.contents.push({ ...ourImpactContent, icon: iconPath });
    const savedOurImpact = await ourImpact.save();
    res.status(201).json({ success: true, data: savedOurImpact });
  }),
];

// Get all OurImpacts
exports.getAllOurImpacts = CatchAsyncError(async (req, res, next) => {
  const ourImpact = await OurImpact.findOne();
  if (ourImpact) {
    ourImpact.contents.map((eachImpact, index) => {
      let iconName = eachImpact.icon;
      eachImpact.icon = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
        iconName
      )}`;
    });
  }
  res.status(200).json({ success: true, data: ourImpact });
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
// {
//   icon: {
//     type: String,
//   },
//   count: {
//     type: Number,
//   },
//   countNepali: {
//     type: Number,
//   },
//   desc: {
//     type: String,
//   },
//   descNepali: {
//     type: String,
//   },
// },
// Update a OurImpact

exports.updateOurImpacts = async (req, res, next) => {
  try {
    const objects = req.body;
    const ourImpactObj = await OurImpact.findOne();
    objects.forEach((obj) => {
      const matchedOurImpact = ourImpactObj.contents.find(
        (impactContent, index) => impactContent._id.equals(obj._id)
      );
      if (matchedOurImpact) {
        matchedOurImpact.count = obj.count;
        matchedOurImpact.countNepali = obj.countNepali;
        matchedOurImpact.desc = obj.desc;
        matchedOurImpact.descNepali = obj.descNepali;
        matchedOurImpact.display = obj.display;
        if (obj.newIcon) {
          if (matchedOurImpact.icon) {
            const prevImagePath = `${process.env.FILE_PATH}/images/${matchedOurImpact.icon}`;
            try {
              fs.unlinkSync(prevImagePath);
            } catch (error) {
              console.log("Error removing previous image : ", error);
            }
          }

          const iconData = obj.newIcon.replace(/^data:image\/w+;base64,/, "");
          const iconBuffer = Buffer.from(iconData, "base64");
          const iconPath = `${process.env.FILE_PATH}/images/icon_${obj._id}.jpeg`;
          fs.writeFileSync(iconPath, iconBuffer);
          matchedOurImpact.icon = iconPath.split("/").pop();
        }
      }
    });
    const savedStatus = await ourImpactObj.save();
    res.status(200).json({ success: true, data: savedStatus });
  } catch (error) {
    console.error("Error updating our impacts: ", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Delete a OurImpact

exports.deleteOurImpact = CatchAsyncError(async (req, res, next) => {
  const ourImpactId = req.params.id;
  const ourImpact = await OurImpact.findOne();
  let contents = ourImpact.contents.filter((bc) => {
    return !bc._id.equals(ourImpactId);
  });
  ourImpact.contents = contents;
  await ourImpact.save();
  res.status(200).json({ success: true, data: req.params.id });
});
