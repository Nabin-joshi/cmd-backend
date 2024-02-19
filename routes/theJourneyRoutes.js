const express = require("express");
const theJourneyRouter = express.Router();
const theJourneyController = require("../controller/theJourneyController");
const auth = require("../middlewares/auth");
theJourneyRouter.post("/heading", theJourneyController.createTheJourneyHeading);
theJourneyRouter.post(
  "/contents",
  theJourneyController.createTheJourneyContent
);

// get all
theJourneyRouter.get("/all", theJourneyController.getAllTheJourneys);

// get blog by id
theJourneyRouter.get("/:id", theJourneyController.getTheJourneyById);

// update
theJourneyRouter.put("/update/:id", theJourneyController.updateTheJourney);

// delete
theJourneyRouter.delete("/:id", auth, theJourneyController.deleteTheJourney);

module.exports = theJourneyRouter;
