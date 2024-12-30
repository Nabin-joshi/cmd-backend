const Introduction = require("../../../models/CMSModels/About-Us/introduction");
const OurThematicAreas = require("../../../models/CMSModels/About-Us/ourThematicAreas");
const OurValues = require("../../../models/CMSModels/About-Us/ourValues");
const OurApproach = require("../../../models/CMSModels/About-Us/ourApproach");

const { BACKEND_SERVER_PATH } = require("../../../config/config");
const equalizeArrayLengths = require("../../equalizeController");

const createIntroduction = async (req, res, next) => {
  const {
    locale,
    introductionTitle,
    introductionDescription,
    ourVisionTitle,
    ourVisionDescription,
    ourMissionTitle,
    ourMissionDescription,
    ourGoalTitle,
    ourGoalDescription,
    imageTitle,
    visionIcon,
    missionIcon,
    goalIcon,
  } = req.body;

  let newIntroduction;
  try {
    newIntroduction = new Introduction({
      locale,
      introductionTitle,
      introductionDescription,
      ourVisionTitle,
      ourVisionDescription,
      ourMissionTitle,
      ourMissionDescription,
      ourGoalTitle,
      ourGoalDescription,
      imageTitle,
      visionIcon,
      missionIcon,
      goalIcon,
    });
    await newIntroduction.save();
  } catch (error) {
    return next(error);
  }

  return res.status(201).json({ message: "Successfully Added" });
};

const getIntroductionContent = async (req, res, next) => {
  const locale = req.params.locale;

  try {
    const introductionData = await Introduction.findOne({ locale: locale });
    if (introductionData) {
      if (introductionData.visionIcon) {
        introductionData.visionIcon = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
          introductionData.visionIcon
        )}`;
      }
      if (introductionData.missionIcon) {
        introductionData.missionIcon = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
          introductionData.missionIcon
        )}`;
      }
      if (introductionData.goalIcon) {
        introductionData.goalIcon = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
          introductionData.goalIcon
        )}`;
      }
    }
    return res.status(201).json(introductionData);
  } catch (error) {
    return next(error);
  }
};

const getAllIntroductionContent = async (req, res, next) => {
  try {
    let selectedIntroduction = await Introduction.find();
    selectedIntroduction.forEach((introduction) => {
      if (introduction.visionIcon) {
        introduction.visionIcon = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
          introduction.visionIcon
        )}`;
      }
      if (introduction.missionIcon) {
        introduction.missionIcon = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
          introduction.missionIcon
        )}`;
      }
      if (introduction.goalIcon) {
        introduction.goalIcon = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
          introduction.goalIcon
        )}`;
      }
    });
    return res.status(200).json(selectedIntroduction);
  } catch (err) {
    return next(err);
  }
};

const updateIntroductionData = async (req, res, next) => {
  const getData = req.body;
  const locale = req.params.locale;

  try {
    let selectedData = await Introduction.findOne({ locale: locale });
    if (selectedData) {
      selectedData.introductionTitle = getData.introductionTitle;
      selectedData.introductionDescription = getData.introductionDescription;
      selectedData.ourVisionTitle = getData.ourVisionTitle;
      selectedData.ourVisionDescription = getData.ourVisionDescription;
      selectedData.ourMissionTitle = getData.ourMissionTitle;
      selectedData.ourMissionDescription = getData.ourMissionDescription;
      selectedData.ourGoalTitle = getData.ourGoalTitle;
      selectedData.ourGoalDescription = getData.ourGoalDescription;
      selectedData.imageTitle = getData.imageTitle;

      // Handle multiple file uploads
      if (req.files) {
        if (req.files.visionIcon && req.files.visionIcon[0]) {
          selectedData.visionIcon = req.files.visionIcon[0].filename;
        }
        if (req.files.missionIcon && req.files.missionIcon[0]) {
          selectedData.missionIcon = req.files.missionIcon[0].filename;
        }
        if (req.files.goalIcon && req.files.goalIcon[0]) {
          selectedData.goalIcon = req.files.goalIcon[0].filename;
        }
      }

      await selectedData.save();
      return res.status(201).json({ msg: "Introduction Updated Successfully" });
    }
  } catch (error) {
    return next(error);
  }
};

// Thematic Areas
const createOurThematicArea = async (req, res, next) => {
  const { heading, locale, thematicAreas } = req.body;

  let newThematicArea;

  try {
    newThematicArea = new OurThematicAreas({ heading, locale, thematicAreas });
    await newThematicArea.save();
    return res.status(201).json({ msg: "ThematicArea Created successfully" });
  } catch (err) {
    return next(err);
  }
};

const updateThematicArea = async (req, res, next) => {
  const locale = req.params.locale;
  const data = req.body;

  let selectedData;
  try {
    selectedData = await OurThematicAreas.findOne({ locale: locale });

    let individualThematicArea = selectedData.thematicAreas.find(
      (item) => item.id === data.id
    );
    if (individualThematicArea) {
      individualThematicArea.title = data.title;
      individualThematicArea.description = data.description;
      if (req.file) {
        individualThematicArea.image = req.file.filename;
      }

      await selectedData.save();
      res.status(201).json({ msg: "ThematicArea Updated Successfully" });
    } else {
      let newData = {
        image: req.file ? req.file.filename : "",
        title: data.title,
        description: data.description,
      };
      selectedData.thematicAreas.push(newData);
      selectedData.save();
      res.status(201).json({ msg: "ThematicArea saved Successfully" });
    }
  } catch (err) {
    return next(err);
  }
};

const updateOurThematicAreasHeading = async (req, res, next) => {
  const getData = req.body;
  const locale = req.params.locale;

  let selectedData;

  try {
    selectedData = await OurThematicAreas.findOne({ locale: locale });
    if (selectedData) {
      await OurThematicAreas.updateOne(
        { locale: locale },
        {
          heading: getData.heading,
        }
      );
    }
    return res
      .status(201)
      .json({ msg: "Our ThematicArea Heading Updated Successfully" });
  } catch (error) {
    return next(error);
  }
};

const getOurThematicArea = async (req, res, next) => {
  let locale = req.params.locale;

  try {
    let ourThematicAreas = await OurThematicAreas.findOne({ locale: locale });
    ourThematicAreas.thematicAreas = ourThematicAreas.thematicAreas.map(
      (item) => {
        if (item.image && item.image !== "") {
          item.image = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
            item.image
          )}`;
          return item;
        } else {
          return item;
        }
      }
    );
    if (ourThematicAreas) {
      return res.status(200).json(ourThematicAreas);
    }
  } catch (err) {
    return next(err);
  }
};

const getAllOurThematicArea = async (req, res, next) => {
  try {
    let ourThematicAreas = await OurThematicAreas.find();
    let emptyThematicAreas = {
      image: "",
      title: "",
      description: "",
    };
    ourThematicAreas = equalizeArrayLengths(
      ourThematicAreas,
      "thematicAreas",
      emptyThematicAreas
    );
    ourThematicAreas.forEach((ourthematicAreas) => {
      ourthematicAreas.thematicAreas = ourthematicAreas.thematicAreas.map(
        (item) => {
          if (item.image && item.image !== "") {
            item.image = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
              item.image
            )}`;
            return item;
          } else {
            return item;
          }
        }
      );
    });
    if (ourThematicAreas) {
      return res.status(200).json(ourThematicAreas);
    }
  } catch (err) {
    return next(err);
  }
};

const deleteOurThematicArea = async (req, res, next) => {
  let locale = req.params.locale;
  const id = req.query.id;

  try {
    let ourThematicAreas = await OurThematicAreas.findOne({ locale: locale });
    const indexToDelete = ourThematicAreas.thematicAreas.findIndex(
      (item) => item._id.toString() === id.toString()
    );

    if (indexToDelete !== -1) {
      ourThematicAreas.thematicAreas.splice(indexToDelete, 1);
    }

    await ourThematicAreas.save();
    return res
      .status(201)
      .json({ msg: "Our ThematicArea Deleted Successfully" });
  } catch (err) {
    return next(err);
  }
};

// Our Values

const createOurValues = async (req, res, next) => {
  const { heading, locale, values } = req.body;

  let newValues;

  try {
    newValues = new OurValues({ heading, locale, values });
    await newValues.save();
    return res.status(201).json({ msg: "Values Created successfully" });
  } catch (err) {
    return next(err);
  }
};

const updateValues = async (req, res, next) => {
  const locale = req.params.locale;
  const data = req.body;

  let selectedData;
  try {
    selectedData = await OurValues.findOne({ locale: locale });

    let individualValues = selectedData.values.find(
      (item) => item.id === data.id
    );
    if (individualValues) {
      individualValues.title = data.title;
      if (req.file) {
        individualValues.image = req.file.filename;
      }

      await selectedData.save();
      res.status(201).json({ msg: "Values Updated Successfully" });
    } else {
      let newData = {
        image: req.file ? req.file.filename : "",
        title: data.title,
      };
      selectedData.values.push(newData);
      selectedData.save();
      res.status(201).json({ msg: "Values saved Successfully" });
    }
  } catch (err) {
    return next(err);
  }
};

const updateOurValuesHeading = async (req, res, next) => {
  const getData = req.body;
  const locale = req.params.locale;

  let selectedData;

  try {
    selectedData = await OurValues.findOne({ locale: locale });
    if (selectedData) {
      await OurValues.updateOne(
        { locale: locale },
        {
          heading: getData.heading,
        }
      );
    }
    return res
      .status(201)
      .json({ msg: "Our Values Heading Updated Successfully" });
  } catch (error) {
    return next(error);
  }
};

const getOurValues = async (req, res, next) => {
  let locale = req.params.locale;

  try {
    let ourValues = await OurValues.findOne({ locale: locale });
    ourValues.values = ourValues.values.map((item) => {
      if (item.image && item.image !== "") {
        item.image = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
          item.image
        )}`;
        return item;
      } else {
        return item;
      }
    });
    if (ourValues) {
      return res.status(200).json(ourValues);
    }
  } catch (err) {
    return next(err);
  }
};

const getAllOurValues = async (req, res, next) => {
  try {
    let ourValues = await OurValues.find();
    let emptyOurValues = {
      image: "",
      title: "",
    };
    ourValues = equalizeArrayLengths(ourValues, "values", emptyOurValues);
    ourValues.forEach((ourvalues) => {
      ourvalues.values = ourvalues.values.map((item) => {
        if (item.image && item.image !== "") {
          item.image = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
            item.image
          )}`;
          return item;
        } else {
          return item;
        }
      });
    });
    if (ourValues) {
      return res.status(200).json(ourValues);
    }
  } catch (err) {
    return next(err);
  }
};

const deleteOurValues = async (req, res, next) => {
  let locale = req.params.locale;
  const id = req.query.id;

  try {
    let ourValues = await OurValues.findOne({ locale: locale });
    const indexToDelete = ourValues.values.findIndex(
      (item) => item._id.toString() === id.toString()
    );

    if (indexToDelete !== -1) {
      ourValues.values.splice(indexToDelete, 1);
    }

    await ourValues.save();
    return res.status(201).json({ msg: "Our Values Deleted Successfully" });
  } catch (err) {
    return next(err);
  }
};

// Our Approach

const createOurApproach = async (req, res, next) => {
  const { heading, locale, approach } = req.body;

  let newApproach;

  try {
    newApproach = new OurApproach({ heading, locale, approach });
    await newApproach.save();
    return res.status(201).json({ msg: "Approach Created successfully" });
  } catch (err) {
    return next(err);
  }
};

const updateApproach = async (req, res, next) => {
  const locale = req.params.locale;
  const data = req.body;

  let selectedData;
  try {
    selectedData = await OurApproach.findOne({ locale: locale });

    let individualApproach = selectedData.approach.find(
      (item) => item.id === data.id
    );
    if (individualApproach) {
      individualApproach.title = data.title;
      individualApproach.description = data.description;
      if (req.file) {
        individualApproach.image = req.file.filename;
      }

      await selectedData.save();
      res.status(201).json({ msg: "Approach Updated Successfully" });
    } else {
      let newData = {
        image: req.file ? req.file.filename : "",
        title: data.title,
      };
      selectedData.approach.push(newData);
      selectedData.save();
      res.status(201).json({ msg: "Approach saved Successfully" });
    }
  } catch (err) {
    return next(err);
  }
};

const updateOurApproachHeading = async (req, res, next) => {
  const getData = req.body;
  const locale = req.params.locale;

  let selectedData;

  try {
    selectedData = await OurApproach.findOne({ locale: locale });
    if (selectedData) {
      await OurApproach.updateOne(
        { locale: locale },
        {
          heading: getData.heading,
        }
      );
    }
    return res
      .status(201)
      .json({ msg: "Our Approach Heading Updated Successfully" });
  } catch (error) {
    return next(error);
  }
};

const getOurApproach = async (req, res, next) => {
  let locale = req.params.locale;

  try {
    let ourApproach = await OurApproach.findOne({ locale: locale });
    ourApproach.approach = ourApproach.approach.map((item) => {
      if (item.image && item.image !== "") {
        item.image = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
          item.image
        )}`;
        return item;
      } else {
        return item;
      }
    });
    if (ourApproach) {
      return res.status(200).json(ourApproach);
    }
  } catch (err) {
    return next(err);
  }
};

const getAllOurApproach = async (req, res, next) => {
  try {
    let ourApproach = await OurApproach.find();
    let emptyApproach = {
      image: "",
      title: "",
      description: "",
    };
    ourApproach = equalizeArrayLengths(ourApproach, "approach", emptyApproach);
    ourApproach.forEach((ourapproach) => {
      ourapproach.approach = ourapproach.approach.map((item) => {
        if (item.image && item.image !== "") {
          item.image = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
            item.image
          )}`;
          return item;
        } else {
          return item;
        }
      });
    });
    if (ourApproach) {
      return res.status(200).json(ourApproach);
    }
  } catch (err) {
    return next(err);
  }
};

const deleteOurApproach = async (req, res, next) => {
  let locale = req.params.locale;
  const id = req.query.id;

  try {
    let ourApproach = await OurApproach.findOne({ locale: locale });
    const indexToDelete = ourApproach.approach.findIndex(
      (item) => item._id.toString() === id.toString()
    );

    if (indexToDelete !== -1) {
      ourApproach.approach.splice(indexToDelete, 1);
    }

    await ourApproach.save();
    return res.status(201).json({ msg: "Our Approach Deleted Successfully" });
  } catch (err) {
    return next(err);
  }
};

const introductionController = {
  createIntroduction,
  getIntroductionContent,
  getAllIntroductionContent,
  updateIntroductionData,
  //   Thematic Area
  createOurThematicArea,
  updateOurThematicAreasHeading,
  updateThematicArea,
  getAllOurThematicArea,
  getOurThematicArea,
  deleteOurThematicArea,
  //   Our Values
  createOurValues,
  updateOurValuesHeading,
  updateValues,
  getAllOurValues,
  getOurValues,
  deleteOurValues,

  //   Our Approach
  createOurApproach,
  updateOurApproachHeading,
  updateApproach,
  getAllOurApproach,
  getOurApproach,
  deleteOurApproach,
};

module.exports = introductionController;
