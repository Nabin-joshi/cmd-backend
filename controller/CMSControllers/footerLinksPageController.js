const FAQ = require("../../models/CMSModels/Footer-Links/FAQ");
const TermsOfService = require("../../models/CMSModels/Footer-Links/termsOfService");
const PrivacyPolicy = require("../../models/CMSModels/Footer-Links/privacyPolicy");

const createFAQ = async (req, res, next) => {
  const { content, locale } = req.body;

  let newFAQ;
  try {
    newFAQ = await new FAQ({
      content,
      locale,
    });
    await newFAQ.save();
    return res.status(201).json({ message: "Successfully Added" });
  } catch (error) {
    return next(error);
  }
};

const getFAQ = async (req, res, next) => {
  const locale = req.params.locale;

  try {
    const newFAQ = await FAQ.findOne({ locale: locale });
    return res.status(201).json(newFAQ);
  } catch (error) {
    return next(error);
  }
};

const getAllFAQ = async (req, res, next) => {
  try {
    const newFAQ = await FAQ.find();
    return res.status(201).json(newFAQ);
  } catch (error) {
    return next(error);
  }
};

const updateFAQ = async (req, res, next) => {
  const newFAQ = req.body;
  const locale = req.params.locale;

  let selectedData;

  try {
    selectedData = await FAQ.findOne({ locale: locale });
    if (selectedData) {
      await FAQ.updateOne(
        { locale: locale },
        {
          content: newFAQ.content,
        }
      );
    }
    return res.status(201).json({ msg: " Updated Successfully" });
  } catch (error) {
    return next(error);
  }
};

const createTermsOfService = async (req, res, next) => {
  const { content, locale } = req.body;

  let newTermsOfService;
  try {
    newTermsOfService = await new TermsOfService({
      content,
      locale,
    });
    await newTermsOfService.save();
    return res.status(201).json({ message: "Successfully Added" });
  } catch (error) {
    return next(error);
  }
};

const getTermsOfservice = async (req, res, next) => {
  const locale = req.params.locale;

  try {
    const termsOfService = await TermsOfService.findOne({ locale: locale });
    return res.status(201).json(termsOfService);
  } catch (error) {
    return next(error);
  }
};

const getAllTermsOfService = async (req, res, next) => {
  try {
    const termsOfService = await TermsOfService.find();
    return res.status(201).json(termsOfService);
  } catch (error) {
    return next(error);
  }
};

const updateTermsOfService = async (req, res, next) => {
  const termsOfService = req.body;
  const locale = req.params.locale;

  let selectedData;

  try {
    selectedData = await TermsOfService.findOne({ locale: locale });
    if (selectedData) {
      await TermsOfService.updateOne(
        { locale: locale },
        {
          content: termsOfService.content,
        }
      );
    }
    return res.status(201).json({ msg: " Updated Successfully" });
  } catch (error) {
    return next(error);
  }
};

const createPrivacyPolicy = async (req, res, next) => {
  const { content, locale } = req.body;

  let newPrivacyPolicy;
  try {
    newPrivacyPolicy = await new PrivacyPolicy({
      content,
      locale,
    });
    await newPrivacyPolicy.save();
    return res.status(201).json({ message: "Successfully Added" });
  } catch (error) {
    return next(error);
  }
};

const getPrivacyPolicy = async (req, res, next) => {
  const locale = req.params.locale;

  try {
    const privacyPolicy = await PrivacyPolicy.findOne({ locale: locale });
    return res.status(201).json(privacyPolicy);
  } catch (error) {
    return next(error);
  }
};

const getAllPrivacyPolicy = async (req, res, next) => {
  try {
    const privacyPolicy = await PrivacyPolicy.find();
    return res.status(201).json(privacyPolicy);
  } catch (error) {
    return next(error);
  }
};

const updatePrivacyPolicy = async (req, res, next) => {
  const privacyPolicy = req.body;
  const locale = req.params.locale;

  let selectedData;

  try {
    selectedData = await PrivacyPolicy.findOne({ locale: locale });
    if (selectedData) {
      await PrivacyPolicy.updateOne(
        { locale: locale },
        {
          content: privacyPolicy.content,
        }
      );
    }
    return res.status(201).json({ msg: " Updated Successfully" });
  } catch (error) {
    return next(error);
  }
};

const footerLinksPageController = {
  // FAQ
  createFAQ,
  getFAQ,
  updateFAQ,
  getAllFAQ,

  // Terms of Service
  createTermsOfService,
  getTermsOfservice,
  updateTermsOfService,
  getAllTermsOfService,

  //   privacy Policy
  createPrivacyPolicy,
  getPrivacyPolicy,
  updatePrivacyPolicy,
  getAllPrivacyPolicy,
};

module.exports = footerLinksPageController;
