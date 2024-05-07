const PopupPage = require("../../models/CMSModels/popUpPage");

const createPopupPage = async (req, res, next) => {
  const { locale, heading, content } = req.body;

  try {
    let newPopupPages = new PopupPage({
      locale,
      heading,
      content,
      showPopup,
    });

    await newPopupPages.save();
    res.status(201).json({ msg: "Social Links Created successfully" });
  } catch (err) {
    return next(err);
  }
};

const getAllPopupPage = async (req, res, next) => {
  try {
    const popupPage = await PopupPage.find();
    if (popupPage) {
      return res.status(200).json(popupPage);
    }
  } catch (err) {
    return next(err);
  }
};

const getPopupPage = async (req, res, next) => {
  const locale = req.params.locale;

  try {
    let selectedData = await PopupPage.findOne({ locale: locale });
    if (selectedData) {
      return res.status(200).json({ selectedData });
    }
  } catch (err) {
    return next(err);
  }
};

const updatePopupPage = async (req, res, next) => {
  const popupPage = req.body;
  const locale = req.params.locale;

  try {
    let selectedData = await PopupPage.findOne({ locale: locale });
    if (selectedData) {
      await PopupPage.updateOne(
        { locale: locale },
        {
          heading: popupPage.heading,
          content: popupPage.content,
          showPopup: popupPage.showPopup,
        }
      );
    }
    res.status(201).json({ msg: "Added successfully" });
  } catch (err) {
    return next(err);
  }
};
const popupPageController = {
  create: createPopupPage,
  getAll: getAllPopupPage,
  update: updatePopupPage,
  get: getPopupPage,
};

module.exports = popupPageController;
