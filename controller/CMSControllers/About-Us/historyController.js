const { BACKEND_SERVER_PATH } = require("../../../config/config");
const History = require("../../../models/CMSModels/About-Us/history");

const createHistory = async (req, res, next) => {
  const { locale, history } = req.body;

  let newHistory;

  try {
    newHistory = new History({ locale, history });
    await newHistory.save();
    return res.status(201).json({ msg: "History Created successfully" });
  } catch (err) {
    return next(err);
  }
};

const getAllHistory = async (req, res, next) => {
  try {
    let selectedHistory = await History.find();
    selectedHistory.forEach((History) => {
      History.history = History.history.map((item) => {
        if (item.image && item.image !== "") {
          item.image = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
            item.image
          )}`;
          return item;
        } else {
          return item;
        }
      });
    });
    if (selectedHistory) {
      return res.status(200).json(selectedHistory);
    }
  } catch (err) {
    return next(err);
  }
};

const updateHistory = async (req, res, next) => {
  const locale = req.params.locale;
  const data = req.body;

  let selectedData;
  try {
    selectedData = await History.findOne({ locale: locale });

    let individualHistory = selectedData.history.find(
      (item) => item.id === data.id
    );
    if (individualHistory) {
      individualHistory.title = data.title;
      individualHistory.subTitle = data.subTitle;
      individualHistory.description = data.description;
      if (req.file) {
        individualHistory.image = req.file.filename;
      }

      await selectedData.save();
      res.status(201).json({ msg: "History Updated Successfully" });
    } else {
      let newData = {
        image: req.file ? req.file.filename : "",
        title: data.title,
        subTitle: data.subTitle,
        description: data.description,
      };
      selectedData.history.push(newData);
      selectedData.save();
      res.status(201).json({ msg: "History saved Successfully" });
    }
  } catch (err) {
    return next(err);
  }
};

const deleteHistory = async (req, res, next) => {
  let locale = req.params.locale;
  const id = req.query.id;

  try {
    let selectedHistory = await History.findOne({ locale: locale });
    const indexToDelete = selectedHistory.history.findIndex(
      (item) => item._id.toString() === id.toString()
    );

    if (indexToDelete !== -1) {
      selectedHistory.history.splice(indexToDelete, 1);
    }

    await selectedHistory.save();
    return res.status(201).json({ msg: "Our Work Deleted Successfully" });
  } catch (err) {
    return next(err);
  }
};

const getHistory = async (req, res, next) => {
  let locale = req.params.locale;

  try {
    let selectedHistory = await History.findOne({ locale: locale });
    selectedHistory.history = selectedHistory.history.map((item) => {
      if (item.image && item.image !== "") {
        item.image = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
          item.image
        )}`;
        return item;
      } else {
        return item;
      }
    });
    if (selectedHistory) {
      return res.status(200).json(selectedHistory);
    }
  } catch (err) {
    return next(err);
  }
};

const updateHistoryDescription = async (req, res, next) => {
  const getData = req.body;
  const locale = req.params.locale;

  let selectedData;

  try {
    selectedData = await History.findOne({ locale: locale });
    if (selectedData) {
      await History.updateOne(
        { locale: locale },
        {
          historyDescription: getData.historyDescription,
        }
      );
    }
    return res
      .status(201)
      .json({ msg: "History Description Updated Successfully" });
  } catch (error) {
    return next(error);
  }
};

const historyController = {
  create: createHistory,
  update: updateHistory,
  get: getHistory,
  getAll: getAllHistory,
  deleteHistory: deleteHistory,
  updateHistoryDescription,
};
module.exports = historyController;
