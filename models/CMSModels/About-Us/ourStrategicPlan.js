const mongoose = require("mongoose");

const ourStrategicPlan = new mongoose.Schema({
  locale: String,
  content: String,
});

const OurStrategicPlan = mongoose.model("ourStrategicPlan", ourStrategicPlan);

module.exports = OurStrategicPlan;
