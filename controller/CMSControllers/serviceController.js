const fs = require("fs");
const Service = require("../../models/CMSModels/serviceModel");
const { BACKEND_SERVER_PATH } = require("../config/config");

const createService = async (req, res, next) => {
  if (error) {
    return next(error);
  }

  const { author, content } = req.body;

  let newService;
  try {
    newService = new Service({
      author,
      content,
    });
    await newService.save();
  } catch (error) {
    return next(error);
  }

  return res.status(201).json({ message: "Successfully Added" });
};

const getContentBlogs = async (req, res, next) => {
  let blogsDto;
  try {
    const blogs = await Blog.find({});
    blogsDto = blogs.map((blog) => new BlogDTO(blog));
    return res.status(201).json({ blogs: blogsDto });
  } catch (error) {
    return next(error);
  }
};

const getServiceById = async (req, res, next) => {
  let blog;

  const getByIdSchema = Joi.object({
    id: Joi.string().regex(mongodbIdPattern).required(),
  });

  const { error } = getByIdSchema.validate(req.params);

  if (error) {
    return next(error);
  }
  const { id } = req.params;
  try {
    blog = await Blog.findOne({ _id: id }).populate("author");
    return res.status(201).json({ blog: blog });
  } catch (error) {
    return next(error);
  }
};

const updateBlogs = async (req, res, next) => {
  // validation if necessary using joi

  const getBlog = req.body;
  const blogId = req.params.id;

  let selectedBlog;

  try {
    selectedBlog = await Blog.findOne({ _id: blogId });
    if (selectedBlog) {
      await Blog.updateOne(
        { _id: blogId },
        {
          author: getBlog.author,
          title: getBlog.title,
          content: getBlog.content,
          photoPath: getBlog.photo,
        }
      );
    }
    return res.status(201).json({ msg: "Blog Updated Successfully" });
  } catch (error) {
    return next(error);
  }
};

const deleteBlogs = async (req, res, next) => {
  const blogId = req.params.id;

  try {
    await Blog.deleteOne({ _id: blogId });
  } catch (error) {
    return next(error);
  }

  return res.status(201).json({ msg: "Blog deleted SuccessFully" });
};

const blogController = {
  create: createBlog,
  getAll: getAllBlogs,
  getById: getBlogsById,
  update: updateBlogs,
  delete: deleteBlogs,
};

module.exports = blogController;
