const { BACKEND_SERVER_PATH } = require("../../config/config");
const Resources = require("../../models/CMSModels/resourcesNavbarImages"); // Ensure this path is correct

const createResourcesImage = async (req, res, next) => {
  const {
    locale,
    procurement,
    vacancy,
    volunteer,
    digitalLibrary,
    transformingLives,
    blog,
  } = req.body;

  let newData;

  try {
    newData = new Resources({
      locale,
      procurement,
      vacancy,
      volunteer,
      digitalLibrary,
      transformingLives,
      blog,
    });
    await newData.save();
    return res.status(201).json({ msg: "Work Created successfully" });
  } catch (err) {
    return next(err);
  }
};

const updateResourcesImage = async (req, res, next) => {
  const data = req.body;

  try {
    let selectedData = await Resources.findOne({ locale: "" });

    if (req.file) {
      if (data.name === "procurement") {
        selectedData.procurement = req.file.filename;
      } else if (data.name === "vacancy") {
        selectedData.vacancy = req.file.filename;
      } else if (data.name === "volunteer") {
        selectedData.volunteer = req.file.filename;
      } else if (data.name === "digitalLibrary") {
        selectedData.digitalLibrary = req.file.filename;
      } else if (data.name === "transformingLives") {
        selectedData.transformingLives = req.file.filename;
      } else if (data.name === "blog") {
        selectedData.blog = req.file.filename;
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

const getResourcesImage = async (req, res, next) => {
  try {
    let resourcesImages = await Resources.findOne({ locale: "" });
    if (resourcesImages.procurement && resourcesImages.procurement != "") {
      resourcesImages.procurement = `${BACKEND_SERVER_PATH}/public/images/${resourcesImages.procurement}`;
    }
    if (resourcesImages.vacancy && resourcesImages.vacancy != "") {
      resourcesImages.vacancy = `${BACKEND_SERVER_PATH}/public/images/${resourcesImages.vacancy}`;
    }
    if (resourcesImages.volunteer && resourcesImages.volunteer != "") {
      resourcesImages.volunteer = `${BACKEND_SERVER_PATH}/public/images/${resourcesImages.volunteer}`;
    }
    if (
      resourcesImages.digitalLibrary &&
      resourcesImages.digitalLibrary != ""
    ) {
      resourcesImages.digitalLibrary = `${BACKEND_SERVER_PATH}/public/images/${resourcesImages.digitalLibrary}`;
    }
    if (
      resourcesImages.transformingLives &&
      resourcesImages.transformingLives != ""
    ) {
      resourcesImages.transformingLives = `${BACKEND_SERVER_PATH}/public/images/${resourcesImages.transformingLives}`;
    }
    if (resourcesImages.blog && resourcesImages.blog != "") {
      resourcesImages.blog = `${BACKEND_SERVER_PATH}/public/images/${resourcesImages.blog}`;
    }

    return res.status(200).json(resourcesImages);
  } catch (err) {
    return next(err);
  }
};

const resourcesImageController = {
  create: createResourcesImage,
  update: updateResourcesImage,
  get: getResourcesImage,
};
module.exports = resourcesImageController;
