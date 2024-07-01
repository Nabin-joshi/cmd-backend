const fs = require("fs");
const path = require("path");
const { BACKEND_SERVER_PATH } = require("../../config/config");
const Publication = require("../../models/CMSModels/publication");

const createPublication = async (req, res, next) => {
  const { locale, publication } = req.body;

  let publications;

  try {
    publications = new Publication({ locale, publication });
    await publications.save();
    return res.status(201).json({ msg: "Publication Created successfully" });
  } catch (err) {
    return next(err);
  }
};

const getAllPublications = async (req, res, next) => {
  try {
    let publication = await Publication.find();
    publication.forEach((element) => {
      element.publication = element.publication.map((item) => {
        if (item.pdf && item.pdf !== "") {
          item.pdf = `${BACKEND_SERVER_PATH}/public/pdf/${encodeURIComponent(
            item.pdf
          )}`;
          return item;
        } else {
          return item;
        }
      });
    });
    if (publication) {
      return res.status(200).json(publication);
    }
  } catch (err) {
    return next(err);
  }
};

const updatePublication = async (req, res, next) => {
  const data = req.body;

  let selectedData;
  try {
    selectedData = await Publication.findOne({ locale: "" });

    let individualPublication = selectedData.publication.find(
      (item) => item.id === data.id
    );
    if (individualPublication) {
      individualPublication.title = data.title;
      if (req.file) {
        individualPublication.pdf = req.file.filename;
      }

      await selectedData.save();
      res.status(201).json({ msg: "Publication Updated Successfully" });
    } else {
      let newData = {
        pdf: req.file ? req.file.filename : "",
        title: data.title,
      };
      selectedData.publication.push(newData);
      selectedData.save();
      res.status(201).json({ msg: "Publication saved Successfully" });
    }
  } catch (err) {
    return next(err);
  }
};

const deletePublication = async (req, res, next) => {
  const id = req.query.id;

  try {
    let selectedData = await Publication.findOne({ locale: "" });
    const indexToDelete = selectedData.publication.findIndex(
      (item) => item._id.toString() === id.toString()
    );

    if (indexToDelete !== -1) {
      const fileNameToDelete = selectedData.publication[indexToDelete].pdf;

      selectedData.publication.splice(indexToDelete, 1);
      //   delete stored file
      const filePath = path.join(__dirname, "public", "pdf", fileNameToDelete);
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
            return next(err);
          }
          console.log("File deleted successfully");
        });
      } else {
        console.log("File not found, nothing to delete");
      }
    }

    await selectedData.save();
    return res.status(201).json({ msg: "Publication Deleted Successfully" });
  } catch (err) {
    return next(err);
  }
};

const getPublication = async (req, res, next) => {
  try {
    const id = req.params.id;
    let selectedData = await Publication.findOne({ locale: "" });
    let data = selectedData.publication.find((item) => item.id === id);
    if (data) {
      data.pdf = `${BACKEND_SERVER_PATH}/public/pdf/${encodeURIComponent(
        data.pdf
      )}`;
    }
    if (selectedData) {
      return res.status(200).json(data);
    }
  } catch (err) {
    return next(err);
  }
};

const PublicationController = {
  create: createPublication,
  update: updatePublication,
  get: getPublication,
  getAll: getAllPublications,
  deleteNews: deletePublication,
};
module.exports = PublicationController;
