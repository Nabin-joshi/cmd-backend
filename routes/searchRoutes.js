const searchRouter = require("express").Router();
const SearchController = require("../controller/searchController");

searchRouter.get("/navsearch/:search", SearchController.get);

module.exports = searchRouter;
