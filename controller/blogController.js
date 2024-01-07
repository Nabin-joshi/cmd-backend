const Joi = require("joi");
const fs = require("fs");
const Blog = require("../models/blogs");
const { BACKEND_SERVER_PATH } = require("../config/config");
const BlogDTO = require("../dto/blogDto");
const blogs = require("../models/blogs");

const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const createBlog = async (req, res, next) => {
  const createBlogSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().regex(mongodbIdPattern).required(),
    content: Joi.string().required(),
    photo: Joi.string().required(),
  });

  const { error } = createBlogSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  const { title, author, content, photo } = req.body;

  const buffer = Buffer.from(
    photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
    "base64"
  );

  const imageName = `${Date.now()}-${author}.png`;

  try {
    fs.writeFileSync(`public/images/${imageName}`, buffer);
  } catch (error) {
    return next(error);
  }
  let newBlog;
  try {
    newBlog = new Blog({
      title,
      author,
      content,
      photoPath: `${BACKEND_SERVER_PATH}/public/images/${imageName}`,
    });
    await newBlog.save();
  } catch (error) {
    return next(error);
  }

  return res.status(201).json({ blog: new BlogDTO(newBlog) });
};

const getAllBlogs = async (req, res, next) => {
  let blogsDto;
  try {
    const blogs = await Blog.find({});
    blogsDto = blogs.map((blog) => new BlogDTO(blog));
    return res.status(201).json({ blogs: blogsDto });
  } catch (error) {
    return next(error);
  }
};

const getBlogsById = async (req, res, next) => {
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
