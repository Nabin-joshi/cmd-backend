const { BACKEND_SERVER_PATH } = require("../../config/config");
const OurWork = require("../../models/CMSModels/ourWork");
const equalizeArrayLengths = require("../equalizeController");

const createWork = async (req, res, next) => {
  const { description, locale, work } = req.body;

  let newWork;

  try {
    newWork = new OurWork({ description, locale, work });
    await newWork.save();
    return res.status(201).json({ msg: "Work Created successfully" });
  } catch (err) {
    return next(err);
  }
};

const updateWork = async (req, res, next) => {
  const locale = req.params.locale;
  const data = req.body;

  let selectedData;
  try {
    selectedData = await OurWork.findOne({ locale: locale });

    let individualWork = selectedData.work.find((item) => item.id === data.id);
    if (individualWork) {
      individualWork.header = data.header;
      individualWork.details = data.details;
      if (locale == "nep") {
        individualWork.image = data.image;
      } else {
        if (req.file) {
          individualWork.image = req.file.filename;
        }
      }
      await selectedData.save();
      res.status(201).json({ msg: "Work Updated Successfully" });
    } else {
      let newData = {
        image: req.file ? req.file.filename : "",
        header: data.header,
        details: data.details,
      };
      selectedData.work.push(newData);
      selectedData.save();
      res.status(201).json({ msg: "Work saved Successfully" });
    }
  } catch (err) {
    return next(err);
  }
};

const updateOurWorkDescriptions = async (req, res, next) => {
  const getData = req.body;
  const locale = req.params.locale;

  let selectedData;

  try {
    selectedData = await OurWork.findOne({ locale: locale });
    if (selectedData) {
      await OurWork.updateOne(
        { locale: locale },
        {
          description: getData.description,
        }
      );
    }
    return res
      .status(201)
      .json({ msg: "Our Work Description Updated Successfully" });
  } catch (error) {
    return next(error);
  }
};

const getWork = async (req, res, next) => {
  let locale = req.params.locale;

  try {
    let ourWork = await OurWork.findOne({ locale: locale });
    ourWork.work = ourWork.work.map((item) => {
      if (item.image && item.image !== "") {
        item.image = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
          item.image
        )}`;
        return item;
      } else {
        return item;
      }
    });
    if (ourWork) {
      return res.status(200).json(ourWork);
    }
  } catch (err) {
    return next(err);
  }
};

const getAllWork = async (req, res, next) => {
  try {
    let ourWork = await OurWork.find();
    let emptyWork = {
      image: "",
      header: "",
      details: "",
    };
    ourWork = equalizeArrayLengths(ourWork, "work", emptyWork);
    ourWork.forEach((ourwork) => {
      ourwork.work = ourwork.work.map((item) => {
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
    if (ourWork) {
      return res.status(200).json(ourWork);
    }
  } catch (err) {
    return next(err);
  }
};

const deleteWork = async (req, res, next) => {
  let locale = req.params.locale;
  const id = req.query.id;

  try {
    let ourWork = await OurWork.findOne({ locale: locale });
    const indexToDelete = ourWork.work.findIndex(
      (item) => item._id.toString() === id.toString()
    );

    if (indexToDelete !== -1) {
      ourWork.work.splice(indexToDelete, 1);
    }

    await ourWork.save();
    return res.status(201).json({ msg: "Our Work Deleted Successfully" });
  } catch (err) {
    return next(err);
  }
};

const ourWorkController = {
  create: createWork,
  update: updateWork,
  updateDescription: updateOurWorkDescriptions,
  get: getWork,
  getAll: getAllWork,
  deleteWork: deleteWork,
};
module.exports = ourWorkController;
