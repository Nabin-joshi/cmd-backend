const MentalHealth = require("../../models/CMSModels/mentalHealth");

const createMentalHealth = async (req, res, next) => {
  const { content, locale } = req.body;

  let newMentalHealth;
  try {
    newMentalHealth = await new MentalHealth({
      content,
      locale,
    });
    await newMentalHealth.save();
    return res.status(201).json({ message: "Successfully Added" });
  } catch (error) {
    return next(error);
  }
};

const getMentalHealth = async (req, res, next) => {
  const locale = req.params.locale;

  try {
    const mentalHealth = await MentalHealth.findOne({ locale: locale });
    return res.status(201).json(mentalHealth);
  } catch (error) {
    return next(error);
  }
};

const getAllMentalHealth = async (req, res, next) => {
  try {
    const mentalHealth = await MentalHealth.find();
    return res.status(201).json(mentalHealth);
  } catch (error) {
    return next(error);
  }
};

const updateMentalHealth = async (req, res, next) => {
  const mentalHealth = req.body;
  const locale = req.params.locale;

  let selectedData;

  try {
    selectedData = await MentalHealth.findOne({ locale: locale });
    if (selectedData) {
      await MentalHealth.updateOne(
        { locale: locale },
        {
          content: mentalHealth.content,
        }
      );
    }
    return res.status(201).json({ msg: " Updated Successfully" });
  } catch (error) {
    return next(error);
  }
};

const ourStrategicPlanController = {
  create: createMentalHealth,
  get: getMentalHealth,
  update: updateMentalHealth,
  getAll: getAllMentalHealth,
};

module.exports = ourStrategicPlanController;
