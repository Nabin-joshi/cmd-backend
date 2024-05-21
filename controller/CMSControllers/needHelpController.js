const NeedHelp = require("../../models/CMSModels/needHelp");

const createNeedHelp = async (req, res, next) => {
  const { content, locale } = req.body;

  let newNeedHelp;
  try {
    newNeedHelp = await new NeedHelp({
      content,
      locale,
    });
    await newNeedHelp.save();
    return res.status(201).json({ message: "Successfully Added" });
  } catch (error) {
    return next(error);
  }
};

const getNeedHelp = async (req, res, next) => {
  const locale = req.params.locale;

  try {
    const newNeedHelp = await NeedHelp.findOne({ locale: locale });
    return res.status(201).json(newNeedHelp);
  } catch (error) {
    return next(error);
  }
};

const getAllNeedHelp = async (req, res, next) => {
  try {
    const newNeedHelp = await NeedHelp.find();
    return res.status(201).json(newNeedHelp);
  } catch (error) {
    return next(error);
  }
};

const updateNeedHelp = async (req, res, next) => {
  const newNeedHelp = req.body;
  const locale = req.params.locale;

  let selectedData;

  try {
    selectedData = await NeedHelp.findOne({ locale: locale });
    if (selectedData) {
      await NeedHelp.updateOne(
        { locale: locale },
        {
          content: newNeedHelp.content,
        }
      );
    }
    return res.status(201).json({ msg: " Updated Successfully" });
  } catch (error) {
    return next(error);
  }
};

const needHelpController = {
  // NeedHelp
  createNeedHelp,
  getNeedHelp,
  updateNeedHelp,
  getAllNeedHelp,
};

module.exports = needHelpController;
