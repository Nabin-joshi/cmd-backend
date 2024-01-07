const router = require("express").Router();
const blogController = require("../controller/blogController");
const auth = require("../middlewares/auth");

// create
router.post("", auth, blogController.create);

// get all
router.get("/all", auth, blogController.getAll);

// get blog by id
router.get("/:id", auth, blogController.getById);

// update
router.put("/update/:id", auth, blogController.update);

// delete
router.delete("/:id", auth, blogController.delete);

module.exports = router;
