const AboutUs = require("../models/AboutUs");
const catchAsyncError = require("../utils/catchAsyncError");
const CatchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

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
  const aboutUsObj = await AboutUs.findOne();
  if (!aboutUsObj) {
    const createdAboutUs = await createAboutUsInital();
  }
  aboutUsObj.boardCommittees.push(req.body);
  const savedAboutUsObj = await aboutUsObj.save();
  res.status(201).json({ success: true, data: savedAboutUsObj });
});

exports.updateAboutUsFields = CatchAsyncError(async (req, res, next) => {
  // const data = [{ key: "value" }, { key: "value" }];
  // const genderOptions = AboutUs.schema
  //   .path("boardCommittees")
  //   .schema.path("gender").enumValues;

  const data = req.body;
  const aboutUsObj = await AboutUs.findOne({});
  const objectKeys = Object.keys(data);
  objectKeys.forEach((item) => {
    if (item === "ourThematicAreas") {
      aboutUsObj.ourThematicAreas.push(data[item]);
    } else {
      aboutUsObj[item] = data[item];
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

  if (!aboutUsObj) {
    aboutUsObj = await createAboutUsInital();
  }
  res.status(200).json({ success: true, data: aboutUsObj });
});

exports.deleteBoardCommitteeMembers = catchAsyncError(
  async (req, res, next) => {
    const boardCommitteeId = req.params.id;
    const aboutUs = await AboutUs.findOne();
    let boardCommittees = aboutUs.boardCommittees.filter(
      (bc) => !bc._id.equals(boardCommitteeId)
    );
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
