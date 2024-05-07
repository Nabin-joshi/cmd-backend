const OurStrategicPlan = require("../../models/CMSModels/About-Us/ourStrategicPlan");

const createStrategicPlan = async (req, res, next) => {
  const { content, locale } = req.body;

  let newStrategicPlan;
  try {
    newStrategicPlan = await new OurStrategicPlan({
      content,
      locale,
    });
    await newStrategicPlan.save();
    return res.status(201).json({ message: "Successfully Added" });
  } catch (error) {
    return next(error);
  }
};

const getStrategicPlan = async (req, res, next) => {
  const locale = req.params.locale;

  try {
    const ourStrategicPlan = await OurStrategicPlan.findOne({ locale: locale });
    return res.status(201).json(ourStrategicPlan);
  } catch (error) {
    return next(error);
  }
};

const getAllStrategicPlan = async (req, res, next) => {
  try {
    const ourStrategicPlan = await OurStrategicPlan.find();
    return res.status(201).json(ourStrategicPlan);
  } catch (error) {
    return next(error);
  }
};

const updateStrategicPlan = async (req, res, next) => {
  const strategicPlan = req.body;
  const locale = req.params.locale;

  let selectedData;

  try {
    selectedData = await OurStrategicPlan.findOne({ locale: locale });
    if (selectedData) {
      await OurStrategicPlan.updateOne(
        { locale: locale },
        {
          content: strategicPlan.content,
        }
      );
    }
    return res.status(201).json({ msg: " Updated Successfully" });
  } catch (error) {
    return next(error);
  }
};

const ourStrategicPlanController = {
  create: createStrategicPlan,
  get: getStrategicPlan,
  update: updateStrategicPlan,
  getAll: getAllStrategicPlan,
};

module.exports = ourStrategicPlanController;
