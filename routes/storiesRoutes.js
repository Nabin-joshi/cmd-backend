const express = require("express");
const storiesRouter = express.Router();
const auth = require("../middlewares/auth");

const storiesController = require("../controller/storiesController");
storiesRouter.post("", storiesController.createStories);
storiesRouter.put("", storiesController.updateStories);

storiesRouter.post("/heading", storiesController.createStoryHeading);
// get all
storiesRouter.get("/all", storiesController.getAllStories);
// get blog by id
storiesRouter.get("/heading", storiesController.getStoriesHeading);

// update
storiesRouter.put("/update/:id", storiesController.updateStories);

// delete
storiesRouter.delete("/:id", auth, storiesController.deleteStories);

module.exports = storiesRouter;
