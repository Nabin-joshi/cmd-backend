const { isFQDN } = require("validator");
const { BACKEND_SERVER_PATH } = require("../config/config");
const Blogs = require("../models/blogs");
const equalizeArrayLengths = require("./equalizeController");
const uuid = require("uuid");

const createBlogs = async (req, res, next) => {
  const { locale, blogs } = req.body;

  let newBlogs;

  try {
    newBlogs = new Blogs({ locale, blogs });
    await newBlogs.save();
    return res.status(201).json({ msg: "Blogs Created successfully" });
  } catch (err) {
    return next(err);
  }
};

const getAllBlogs = async (req, res, next) => {
  try {
    let latestBlogs = await Blogs.find();
    let emptyBlog = {
      image: "",
      title: "",
      day: "",
      month: "",
      contentDescription: "",
      details: "",
      navigationLink: "",
    };
    latestBlogs = equalizeArrayLengths(latestBlogs, "blogs", emptyBlog);
    latestBlogs.forEach((Blogs) => {
      Blogs.blogs = Blogs.blogs.map((item) => {
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
    if (latestBlogs) {
      return res.status(200).json(latestBlogs);
    }
  } catch (err) {
    return next(err);
  }
};

const updateBlogs = async (req, res, next) => {
  const locale = req.params.locale;
  const data = req.body;
  if (!locale) {
    res.status(400).json({ msg: "Invalid request" });
  }
  let selectedData;
  try {
    selectedData = await Blogs.findOne({ locale: locale });

    let individualBlogs = selectedData.blogs.find(
      (item) => item.id === data.id
    );
    if (individualBlogs) {
      individualBlogs.title = data.title;
      individualBlogs.day = data.day;
      individualBlogs.month = data.month;
      individualBlogs.contentDescription = data.contentDescription;
      individualBlogs.details = data.details;
      individualBlogs.navigationLink = data.navigationLink;
      if (req.file) {
        individualBlogs.image = req.file.filename;
      }

      await selectedData.save();
      res.status(201).json({ msg: "Blog Updated Successfully" });
    } else {
      let newData = {
        image: req.file?.filename ?? "",
        title: data?.title ?? "",
        day: data?.day ?? "",
        month: data?.month ?? "",
        contentDescription: data?.contentDescription ?? "",
        details: data?.details ?? "",
        navigationLink: data.navigationLink ?? uuid.v6(),
      };
      selectedData.blogs.push(newData);
      selectedData.save();
      res.status(201).json({ msg: "Blog saved Successfully" });
    }
  } catch (err) {
    return next(err);
  }
};

const deleteBlogs = async (req, res, next) => {
  let locale = req.params.locale;
  const id = req.query.id;

  try {
    let latestBlogs = await Blogs.findOne({ locale: locale });
    const indexToDelete = latestBlogs.blogs.findIndex(
      (item) => item._id.toString() === id.toString()
    );

    if (indexToDelete !== -1) {
      latestBlogs.blogs.splice(indexToDelete, 1);
    }

    await latestBlogs.save();
    return res.status(201).json({ msg: "Blog Deleted Successfully" });
  } catch (err) {
    return next(err);
  }
};

const getBlogs = async (req, res, next) => {
  let locale = req.params.locale;

  try {
    let latestBlogs = await Blogs.findOne({ locale: locale });
    latestBlogs.blogs = latestBlogs.blogs.map((item) => {
      if (item.image && item.image !== "") {
        item.image = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
          item.image
        )}`;
        return item;
      } else {
        return item;
      }
    });
    if (latestBlogs) {
      return res.status(200).json(latestBlogs);
    }
  } catch (err) {
    return next(err);
  }
};

const blogsController = {
  create: createBlogs,
  update: updateBlogs,
  get: getBlogs,
  getAll: getAllBlogs,
  deleteBlogs: deleteBlogs,
};
module.exports = blogsController;
