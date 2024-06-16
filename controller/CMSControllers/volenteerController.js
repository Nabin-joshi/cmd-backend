const Volenteer = require("../../models/CMSModels/volenteer");

const createVolenteer = async (req, res, next) => {
  const { locale, volenteer } = req.body;

  let newVolenteer;

  try {
    newVolenteer = new Volenteer({ locale, volenteer });
    await newVolenteer.save();
    return res.status(201).json({ msg: "Volenteer Created successfully" });
  } catch (err) {
    return next(err);
  }
};

const getAllVolenteer = async (req, res, next) => {
  try {
    let volenteer = await Volenteer.find();
    if (volenteer) {
      return res.status(200).json(volenteer);
    } else {
      return res.status(404).json({ msg: "No Volenteer found" });
    }
  } catch (err) {
    return next(err);
  }
};

const updateVolenteer = async (req, res, next) => {
  const locale = req.params.locale;
  const data = req.body;

  let selectedData;
  try {
    selectedData = await Volenteer.findOne({ locale: locale });

    let individualVolenteer = selectedData.volenteer.find(
      (item) => item.id === data.id
    );
    if (individualVolenteer) {
      individualVolenteer.name = data.name;
      individualVolenteer.content = data.content;

      await selectedData.save();
      res.status(201).json({ msg: "Volenteer Updated Successfully" });
    } else {
      let newData = {
        content: data.content,
        name: data.name,
      };
      selectedData.volen.push(newData);
      selectedData.save();
      res.status(201).json({ msg: "Volenteer saved Successfully" });
    }
  } catch (err) {
    return next(err);
  }
};

const deleteVolenteer = async (req, res, next) => {
  let locale = req.params.locale;
  const id = req.query.id;

  try {
    let selectedData = await Volenteer.findOne({ locale: locale });
    const indexToDelete = selectedData.volenteer.findIndex(
      (item) => item._id.toString() === id.toString()
    );

    if (indexToDelete !== -1) {
      selectedData.volenteer.splice(indexToDelete, 1);
    }

    await selectedData.save();
    return res.status(201).json({ msg: "Volenteer Deleted Successfully" });
  } catch (err) {
    return next(err);
  }
};

const getVolenteer = async (req, res, next) => {
  let locale = req.params.locale;

  try {
    let selectedData = await Volenteer.findOne({ locale: locale });
    if (selectedData) {
      return res.status(200).json(selectedData);
    } else {
      return res.status(404).json({ msg: "Volenteer not found" });
    }
  } catch (err) {
    return next(err);
  }
};

const VolenteerController = {
  create: createVolenteer,
  update: updateVolenteer,
  get: getVolenteer,
  getAll: getAllVolenteer,
  delete: deleteVolenteer,
};
module.exports = VolenteerController;
