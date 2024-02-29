const YourSupport = require("../../models/CMSModels/yourSupport");

const createYourSupport = async (req, res, next) => {
  const { locale, header, details, quotation } = req.body;

  try {
    let newYourSupport = new YourSupport({
      locale,
      header,
      description,
      details,
      quotation,
    });

    await newYourSupport.save();
    res.status(201).json({ msg: "Your Support Created successfully" });
  } catch (err) {
    return next(err);
  }
};

const getYourSupport = async (req, res, next) => {
  const locale = req.params.locale;

  try {
    let selectedData = await YourSupport.findOne({ locale: locale });
    if (selectedData) {
      return res.status(200).json({ yourSupport: selectedData });
    }
  } catch (err) {
    return next(err);
  }
};

const updateYourSupport = async (req, res, next) => {
  const yourSupport = req.body;
  const locale = req.params.locale;

  try {
    let selectedData = await YourSupport.findOne({ locale: locale });
    if (selectedData) {
      await YourSupport.updateOne(
        { locale: locale },
        {
          header: yourSupport.header,
          details: yourSupport.details,
          description: yourSupport.description,
          quotation: yourSupport.quotation,
        }
      );
    }
  } catch (err) {
    return next(err);
  }
};

const yourSupportController = {
  create: createYourSupport,
  getService: getYourSupport,
  update: updateYourSupport,
};

module.exports = yourSupportController;
