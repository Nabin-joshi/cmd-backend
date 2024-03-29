const YourSupport = require("../../models/CMSModels/yourSupport");

const createYourSupport = async (req, res, next) => {
  const { locale, header, details, description, quotation, quotationBy } =
    req.body;

  try {
    let newYourSupport = new YourSupport({
      locale,
      header,
      details,
      description,
      quotation,
      quotationBy,
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

const getAllYourSupport = async (req, res, next) => {
  try {
    let selectedData = await YourSupport.find();
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
          quotationBy: yourSupport.quotationBy,
        }
      );
      res.status(201).json({ msg: "Your Support Updated successfully" });
    }
  } catch (err) {
    return next(err);
  }
};

const yourSupportController = {
  create: createYourSupport,
  getService: getYourSupport,
  update: updateYourSupport,
  getAllYourSupport: getAllYourSupport,
};

module.exports = yourSupportController;
