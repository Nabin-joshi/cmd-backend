const AboutUs = require("../models/AboutUs");
const catchAsyncError = require("../utils/catchAsyncError");
const CatchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const fs = require("fs");
const {
  deletepreviousPhotos,
  storeImage,
  randomNumberGenerator,
  getImageUrl,
} = require("../utils/fileHandling");

async function createAboutUsInital() {
  const createdAboutUs = await AboutUs.create({
    history: "",
    historyNepali: "",
    whoWeAre: "",
    whoWeAreNepali: "",
    ourValues: "",
    ourValuesNepali: "",
    vision: "",
    visionNepali: "",
    mission: "",
    missionNepali: "",
    goal: "",
    goalNepali: "",
    ourThematicAreas: [],
    boardCommittees: [],
  });
  return createdAboutUs;
}

exports.createBroadCommitte = CatchAsyncError(async (req, res, next) => {
  const boardCommitte = req.body;
  if (
    boardCommitte.name.trim() === "" &&
    boardCommitte.nameNepali.trim() === ""
  ) {
    return next(new ErrorHandler("please provide name", 400));
  }
  if (boardCommitte.photo.length > 0) {
    boardCommitte.photo = storeImage(
      boardCommitte.photo,
      randomNumberGenerator()
    );
  }

  const aboutUsObj = await AboutUs.findOne();
  if (!aboutUsObj) {
    const createdAboutUs = await createAboutUsInital();
  }
  aboutUsObj.boardCommittees.push(boardCommitte);
  const savedAboutUsObj = await aboutUsObj.save();
  res.status(201).json({ success: true, data: savedAboutUsObj });
});

exports.updateAboutUsFields = CatchAsyncError(async (req, res, next) => {
  const data = req.body;
  const aboutUsObj = await AboutUs.findOne({});

  Object.keys(data).forEach(async (item) => {
    if (item === "ourThematicAreas") {
      aboutUsObj.ourThematicAreas.push(data[item]);
    } else if (item === "aboutUsHeaderImage") {
      const newImage = data[item];
      deletepreviousPhotos(aboutUsObj.aboutUsHeaderImage);
      aboutUsObj.aboutUsHeaderImage = storeImage(newImage, aboutUsObj._id);
    }
  });

  const updatedAboutUsObj = await aboutUsObj.save();
  res.status(200).json({ success: true, data: updatedAboutUsObj });
});

exports.getAboutUs = CatchAsyncError(async (req, res, next) => {
  const locale = req.query.locale;
  const field = req.query.field;
  const projection = {
    [field]: 1, // Include field1
  };
  let aboutUsObj = await AboutUs.findOne({}, projection);
  if (field === "aboutUsHeaderImage") {
    aboutUsObj[field] = getImageUrl(aboutUsObj.field);
  }
  if (field === "boardCommittees") {
    aboutUsObj.boardCommittees.forEach((bc, index) => {
      bc.photo = getImageUrl(bc.photo);
    });
  }
  if (!aboutUsObj) {
    aboutUsObj = await createAboutUsInital();
  }
  res.status(200).json({ success: true, data: aboutUsObj });
});

exports.deleteBoardCommitteeMembers = catchAsyncError(
  async (req, res, next) => {
    const boardCommitteeId = req.params.id;
    const aboutUs = await AboutUs.findOne();
    let boardCommittees = aboutUs.boardCommittees.filter((bc) => {
      if (bc._id.equals(boardCommitteeId)) {
        deletepreviousPhotos(bc.photo);
      }
      return !bc._id.equals(boardCommitteeId);
    });
    aboutUs.boardCommittees = boardCommittees;
    await aboutUs.save();
    res.status(200).json({ success: true, data: req.params.id });
  }
);

exports.deleteThematicAreas = catchAsyncError(async (req, res, next) => {
  const thematicAreaId = req.params.id;
  const aboutUs = await AboutUs.findOne();
  let thematicAreas = aboutUs.ourThematicAreas.filter(
    (ta) => !ta._id.equals(thematicAreaId)
  );
  aboutUs.ourThematicAreas = thematicAreas;
  await aboutUs.save();
  res.status(200).json({ success: true, data: req.params.id });
});

// Update a boardMember
exports.updateBoardCommitteeMembers = async (req, res, next) => {
  const boardCommitte = req.body;
  try {
    const boardMember = await AboutUs.findOne();
    let selectedData = boardMember.boardCommittees.find(
      (item) => item._id == boardCommitte._id
    );
    if (selectedData) {
      selectedData.name = boardCommitte.name;
      selectedData.nameNepali = boardCommitte.nameNepali;
      selectedData.gender = boardCommitte.gender;
      selectedData.position = boardCommitte.position;
      selectedData.role = boardCommitte.role;
      if (req.file) {
        selectedData.photo = req.file.filename;
      }
    }

    const savedStatus = await boardMember.save();

    res.status(200).json({ success: true, data: savedStatus });
  } catch (error) {
    next(error);
  }
};
