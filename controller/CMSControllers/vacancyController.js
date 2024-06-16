const Vacancy = require("../../models/CMSModels/vacancy");

const createVacancy = async (req, res, next) => {
  const { locale, vacancy } = req.body;

  let newVacancy;

  try {
    newVacancy = new Vacancy({ locale, vacancy });
    await newVacancy.save();
    return res.status(201).json({ msg: "Vacancy Created successfully" });
  } catch (err) {
    return next(err);
  }
};

const getAllVacancy = async (req, res, next) => {
  try {
    let vacancy = await Vacancy.find();
    if (vacancy) {
      return res.status(200).json(vacancy);
    } else {
      return res.status(404).json({ msg: "No Vacancy found" });
    }
  } catch (err) {
    return next(err);
  }
};

const updateVacancy = async (req, res, next) => {
  const locale = req.params.locale;
  const data = req.body;

  let selectedData;
  try {
    selectedData = await Vacancy.findOne({ locale: locale });

    let individualVacancy = selectedData.vacancy.find(
      (item) => item.id === data.id
    );
    if (individualVacancy) {
      individualVacancy.name = data.name;
      individualVacancy.content = data.content;

      await selectedData.save();
      res.status(201).json({ msg: "Vacancy Updated Successfully" });
    } else {
      let newData = {
        content: data.content,
        name: data.name,
      };
      selectedData.vacancy.push(newData);
      selectedData.save();
      res.status(201).json({ msg: "Vacancy saved Successfully" });
    }
  } catch (err) {
    return next(err);
  }
};

const deleteVacancy = async (req, res, next) => {
  let locale = req.params.locale;
  const id = req.query.id;

  try {
    let selectedData = await Vacancy.findOne({ locale: locale });
    const indexToDelete = selectedData.vacancy.findIndex(
      (item) => item._id.toString() === id.toString()
    );

    if (indexToDelete !== -1) {
      selectedData.vacancy.splice(indexToDelete, 1);
    }

    await selectedData.save();
    return res.status(201).json({ msg: "Vacancy Deleted Successfully" });
  } catch (err) {
    return next(err);
  }
};

const getVacancy = async (req, res, next) => {
  let locale = req.params.locale;

  try {
    let selectedData = await Vacancy.findOne({ locale: locale });
    if (selectedData) {
      return res.status(200).json(selectedData);
    } else {
      return res.status(404).json({ msg: "Vacancy not found" });
    }
  } catch (err) {
    return next(err);
  }
};

const VacancyController = {
  create: createVacancy,
  update: updateVacancy,
  get: getVacancy,
  getAll: getAllVacancy,
  delete: deleteVacancy,
};
module.exports = VacancyController;
