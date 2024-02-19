const OurWork = require("../../models/CMSModels/ourWork");

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
    if (selectedData) {
      await OurWork.updateOne(
        { locale: locale },
        {
          description: data.description,
          work: data.work,
        }
      );
      res.status(201).json({ msg: "Work Updated Successfully" });
    }
  } catch (err) {
    return next(err);
  }
};

const getWork = async (req, res, next) => {
  let locale = req.params.locale;

  try {
    let ourWork = await OurWork.findOne({ locale: locale });
    if (ourWork) {
      return res.status(200).json(ourWork);
    }
  } catch (err) {
    return next(err);
  }
};

const ourWorkController = {
  create: createWork,
  update: updateWork,
  get: getWork,
};
module.exports = ourWorkController;
