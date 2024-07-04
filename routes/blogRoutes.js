const router = require("express").Router();
const blogsController = require("../controller/blogController");
const auth = require("../middlewares/auth");
const getFileUploadMiddleware = require("../middlewares/fileUpload");

router.post("/developer/create", blogsController.create);

router.get("/getAllBlogs", blogsController.getAll);

router.put(
  "/updateBlogs/:locale",
  getFileUploadMiddleware("public/images", [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
  ]).single("image"),
  blogsController.update
);

router.delete("/delete/:locale", blogsController.deleteBlogs);

router.get("/getBlogs/:locale", blogsController.get);

module.exports = router;
