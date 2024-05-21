const { BACKEND_SERVER_PATH } = require("../../config/config");
const Branding = require("../../models/CMSModels/branding");

const createBranding = async (req, res, next) => {
  const { contentColor, barColor, logo } = req.body;

  let branding;
  try {
    branding = await new Branding({
      contentColor,
      barColor,
      logo,
    });
    await branding.save();
    return res.status(201).json({ message: "Successfully Added" });
  } catch (error) {
    return next(error);
  }
};

const getBranding = async (req, res, next) => {
  try {
    const branding = await Branding.find();
    if (branding[0].logo && branding[0].logo !== "") {
      branding[0].logo = `${BACKEND_SERVER_PATH}/public/images/${branding[0].logo}`;
    }
    return res.status(201).json(branding);
  } catch (error) {
    return next(error);
  }
};

const updateBranding = async (req, res, next) => {
  const branding = req.body;
  const id = req.params.id;

  let selectedData;

  try {
    selectedData = await Branding.findOne({ _id: id });
    if (selectedData) {
      await Branding.updateOne(
        { _id: id },
        {
          contentColor: branding.contentColor,
          barColor: branding.barColor,
        }
      );
    }
    return res.status(201).json({ msg: " Updated Successfully" });
  } catch (error) {
    return next(error);
  }
};

const updateLogo = async (req, res, next) => {
  const id = req.params.id;
  let selectedData;
  try {
    selectedData = await Branding.findOne({ _id: id });

    if (req.file && req.file.filename !== "") {
      selectedData.logo = req.file.filename;
      selectedData.save();
      res.status(200).json({
        image: `${BACKEND_SERVER_PATH}/public/images/${req.file.filename}`,
      });
    } else {
      selectedData.save();
      res.status(304).json({ msg: "Not Modified" });
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const needHelpController = {
  createBranding,
  getBranding,
  updateBranding,
  updateLogo,
};

module.exports = needHelpController;
