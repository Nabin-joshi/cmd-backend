const router = require("express").Router();
const blogController = require("../controller/blogController");
const auth = require("../middlewares/auth");

// create
router.post("", blogController.create);

// get all
router.get("/all", blogController.getAll);

// get blog by id
router.get("/:id", blogController.getById);

// update
router.put("/update/:id", blogController.update);

// delete
router.delete("/:id", auth, blogController.delete);

module.exports = router;
