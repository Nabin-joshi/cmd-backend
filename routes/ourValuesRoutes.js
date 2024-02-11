const express = require("express");
const ourValuesRouter = express.Router();
const ourValuesController = require("../controller/ourValuesController");
const auth = require("../middlewares/auth");
ourValuesRouter.post("", ourValuesController.createOurValues);

// get all
ourValuesRouter.get("/all", ourValuesController.getAllOurValues);

// get blog by id
ourValuesRouter.get("/:id", ourValuesController.getOurValuesById);

// update
ourValuesRouter.put("/update/:id", ourValuesController.updateOurValues);

// delete
ourValuesRouter.delete("/:id", auth, ourValuesController.deleteOurValues);

module.exports = ourValuesRouter;
