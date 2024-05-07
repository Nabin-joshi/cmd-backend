const { BACKEND_SERVER_PATH } = require("../../config/config");
const GetInvolved = require("../../models/CMSModels/getInvolvedNavbarImages"); // Ensure this path is correct

const createGetInvolvedImage = async (req, res, next) => {
  const { locale, procurement, vacancy, volunteer, donate } = req.body;

  let newData;

  try {
    newData = new GetInvolved({
      locale,
      procurement,
      vacancy,
      volunteer,
      donate,
    });
    await newData.save();
    return res.status(201).json({ msg: "Work Created successfully" });
  } catch (err) {
    return next(err);
  }
};

const updateGetInvolvedImage = async (req, res, next) => {
  const data = req.body;

  try {
    let selectedData = await GetInvolved.findOne({ locale: "" });

    if (req.file) {
      if (data.name === "procurement") {
        selectedData.procurement = req.file.filename;
      } else if (data.name === "vacancy") {
        selectedData.vacancy = req.file.filename;
      } else if (data.name === "volunteer") {
        selectedData.volunteer = req.file.filename;
      } else if (data.name === "donate") {
        selectedData.donate = req.file.filename;
      }
      await selectedData.save();
      res.status(201).json({ msg: "Work Updated Successfully" });
    } else {
      res.status(201).json({ msg: "No Image Uploaded" });
    }
  } catch (err) {
    return next(err);
  }
};

const getGetInvolvedImage = async (req, res, next) => {
  try {
    let getInvolved = await GetInvolved.findOne({ locale: "" });
    if (getInvolved.procurement && getInvolved.procurement != "") {
      getInvolved.procurement = `${BACKEND_SERVER_PATH}/public/images/${getInvolved.procurement}`;
    }
    if (getInvolved.vacancy && getInvolved.vacancy != "") {
      getInvolved.vacancy = `${BACKEND_SERVER_PATH}/public/images/${getInvolved.vacancy}`;
    }
    if (getInvolved.volunteer && getInvolved.volunteer != "") {
      getInvolved.volunteer = `${BACKEND_SERVER_PATH}/public/images/${getInvolved.volunteer}`;
    }
    if (getInvolved.donate && getInvolved.donate != "") {
      getInvolved.donate = `${BACKEND_SERVER_PATH}/public/images/${getInvolved.donate}`;
    }

    return res.status(200).json(getInvolved);
  } catch (err) {
    return next(err);
  }
};

const resourcesImageController = {
  create: createGetInvolvedImage,
  update: updateGetInvolvedImage,
  get: getGetInvolvedImage,
};
module.exports = resourcesImageController;
