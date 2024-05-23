const { BACKEND_SERVER_PATH } = require("../../config/config");
const LatestNews = require("../../models/CMSModels/latestNews");

const createNews = async (req, res, next) => {
  const { locale, news } = req.body;

  let newNews;

  try {
    newNews = new LatestNews({ locale, news });
    await newNews.save();
    return res.status(201).json({ msg: "News Created successfully" });
  } catch (err) {
    return next(err);
  }
};

const getAllNews = async (req, res, next) => {
  try {
    let latestNews = await LatestNews.find();
    latestNews.forEach((News) => {
      News.news = News.news.map((item) => {
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
    if (latestNews) {
      return res.status(200).json(latestNews);
    }
  } catch (err) {
    return next(err);
  }
};

const updateNews = async (req, res, next) => {
  const locale = req.params.locale;
  const data = req.body;

  let selectedData;
  try {
    selectedData = await LatestNews.findOne({ locale: locale });

    let individualLatestNews = selectedData.news.find(
      (item) => item.id === data.id
    );
    if (individualLatestNews) {
      individualLatestNews.title = data.title;
      individualLatestNews.day = data.day;
      individualLatestNews.month = data.month;
      individualLatestNews.contentDescription = data.contentDescription;
      individualLatestNews.details = data.details;
      if (req.file) {
        individualLatestNews.image = req.file.filename;
      }

      await selectedData.save();
      res.status(201).json({ msg: "Work Updated Successfully" });
    } else {
      let newData = {
        image: req.file ? req.file.filename : "",
        title: data.title,
        day: data.day,
        month: data.month,
        contentDescription: data.contentDescription,
        details: data.details,
      };
      selectedData.news.push(newData);
      selectedData.save();
      res.status(201).json({ msg: "Work saved Successfully" });
    }
  } catch (err) {
    return next(err);
  }
};

const deleteNews = async (req, res, next) => {
  let locale = req.params.locale;
  const id = req.query.id;

  try {
    let latestNews = await LatestNews.findOne({ locale: locale });
    const indexToDelete = latestNews.news.findIndex(
      (item) => item._id.toString() === id.toString()
    );

    if (indexToDelete !== -1) {
      latestNews.news.splice(indexToDelete, 1);
    }

    await latestNews.save();
    return res.status(201).json({ msg: "Our Work Deleted Successfully" });
  } catch (err) {
    return next(err);
  }
};

const getNews = async (req, res, next) => {
  let locale = req.params.locale;

  try {
    let latestNews = await LatestNews.findOne({ locale: locale });
    latestNews.news = latestNews.news.map((item) => {
      if (item.image && item.image !== "") {
        item.image = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
          item.image
        )}`;
        return item;
      } else {
        return item;
      }
    });
    if (latestNews) {
      return res.status(200).json(latestNews);
    }
  } catch (err) {
    return next(err);
  }
};

const latestNewsController = {
  create: createNews,
  update: updateNews,
  get: getNews,
  getAll: getAllNews,
  deleteNews: deleteNews,
};
module.exports = latestNewsController;
