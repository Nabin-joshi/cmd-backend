const { BACKEND_SERVER_PATH } = require("../../config/config");
const OurWork = require("../../models/CMSModels/ourWorkNavbarImages");

const createOurWorkImage = async (req, res, next) => {
  const {
    locale,
    advocacyAwarness,
    empowerment,
    support,
    orgDevelopment,
    ecsc,
  } = req.body;

  let newData;

  try {
    newData = new OurWork({
      locale,
      advocacyAwarness,
      empowerment,
      support,
      orgDevelopment,
      ecsc,
    });
    await newData.save();
    return res.status(201).json({ msg: "Work Created successfully" });
  } catch (err) {
    return next(err);
  }
};

const updateOurWorkImage = async (req, res, next) => {
  const data = req.body;

  try {
    selectedData = await OurWork.findOne({ locale: "" });

    if (req.file) {
      if (data.name === "advocacyAwarness") {
        selectedData.advocacyAwarness = req.file.filename;
        await selectedData.save();
      } else if (data.name === "empowerment") {
        selectedData.empowerment = req.file.filename;
        await selectedData.save();
      } else if (data.name === "support") {
        selectedData.support = req.file.filename;
        await selectedData.save();
      } else if (data.name === "orgDevelopment") {
        selectedData.orgDevelopment = req.file.filename;
        await selectedData.save();
      } else if (data.name === "ecsc") {
        selectedData.ecsc = req.file.filename;
        await selectedData.save();
      }
      res.status(201).json({ msg: "Work Updated Successfully" });
    } else {
      res.status(201).json({ msg: "No Image Uploaded" });
    }
  } catch (err) {
    return next(err);
  }
};

const getOurWorkImage = async (req, res, next) => {
  try {
    let ourWorkImages = await OurWork.findOne({ locale: "" });
    if (
      ourWorkImages.advocacyAwarness &&
      ourWorkImages.advocacyAwarness != ""
    ) {
      ourWorkImages.advocacyAwarness = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
        ourWorkImages.advocacyAwarness
      )}`;
    }

    if (ourWorkImages.empowerment && ourWorkImages.empowerment != "") {
      ourWorkImages.empowerment = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
        ourWorkImages.empowerment
      )}`;
    }

    if (ourWorkImages.support && ourWorkImages.support != "") {
      ourWorkImages.support = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
        ourWorkImages.support
      )}`;
    }

    if (ourWorkImages.orgDevelopment && ourWorkImages.orgDevelopment != "") {
      ourWorkImages.orgDevelopment = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
        ourWorkImages.orgDevelopment
      )}`;
    }

    if (ourWorkImages.ecsc && ourWorkImages.ecsc != "") {
      ourWorkImages.ecsc = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
        ourWorkImages.ecsc
      )}`;
    }

    return res.status(200).json(ourWorkImages);
  } catch (err) {
    return next(err);
  }
};

const ourWorkImageController = {
  create: createOurWorkImage,
  update: updateOurWorkImage,
  get: getOurWorkImage,
};
module.exports = ourWorkImageController;
