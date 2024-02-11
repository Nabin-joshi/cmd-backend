const express = require("express");
const {
  getAllOurImpacts,
  createOurImpact,
  updateOurImpact,
  deleteOurImpact,
  getOurImpactById,
} = require("../controller/ourImpactController");
const ourImpact = require("../models/ourImpact");
const ourImpactRoutes = express.Router();

ourImpactRoutes
  .route("ourImpact")
  .get(getAllOurImpacts)
  .post(createOurImpact)
  .put(updateOurImpact)
  .delete(deleteOurImpact);

ourImpactRoutes.route("getSingleOurImpact").get(getOurImpactById);

module.exports = ourImpactRoutes;
