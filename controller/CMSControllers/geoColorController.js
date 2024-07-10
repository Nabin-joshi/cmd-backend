const GeoColors = require("../../models/CMSModels/geoColors");

const createColors = async (req, res, next) => {
  const { locale, geocolor } = req.body;

  let color;

  try {
    color = new GeoColors({ locale, geocolor });
    await color.save();
    return res.status(201).json({ msg: "COlors Created successfully" });
  } catch (err) {
    return next(err);
  }
};

const getColors = async (req, res, next) => {
  try {
    let color = await GeoColors.find({ locale: "" });
    if (color) {
      return res.status(200).json(color);
    }
  } catch (err) {
    return next(err);
  }
};

const updateColors = async (req, res, next) => {
  const data = req.body;

  let selectedData;
  try {
    selectedData = await GeoColors.findOne({ locale: "" });

    let individualColor = selectedData.geocolor.find(
      (item) => item.id === data.id
    );
    if (individualColor) {
      individualColor.color = data.color;
      await selectedData.save();
      res.status(201).json({ msg: "Color Updated Successfully" });
    } else {
      let newData = {
        color: data.color,
      };
      selectedData.geocolor.push(newData);
      selectedData.save();
      res.status(201).json({ msg: "Color saved Successfully" });
    }
  } catch (err) {
    return next(err);
  }
};

const deleteColors = async (req, res, next) => {
  const id = req.query.id;

  try {
    let colors = await GeoColors.findOne({ locale: "" });
    const indexToDelete = colors.geocolor.findIndex(
      (item) => item._id.toString() === id.toString()
    );

    if (indexToDelete !== -1) {
      colors.geocolor.splice(indexToDelete, 1);
    }

    await colors.save();
    return res.status(201).json({ msg: "COlor Deleted Successfully" });
  } catch (err) {
    return next(err);
  }
};

const geoColorController = {
  create: createColors,
  update: updateColors,
  get: getColors,
  delete: deleteColors,
};
module.exports = geoColorController;
