const express = require("express");
const {
  addNewsLetterUser,
  addNewsLetterGroup,
  addNewsUserGroupMap,
  getAllNewsLetterUser,
  getAllNewsLetterGroup,
  getLimitedNewsLetterUsers,
  getLimitedNewsLetterGroups,
  donateUs,
  handleKhaltiCallBack,
} = require("../controller/newsLetterController");
const newsLetterRouter = express.Router();

newsLetterRouter
  .route("/newsLetterUser")
  .post(addNewsLetterUser)
  .get(getAllNewsLetterUser);

newsLetterRouter
  .route("/newsLetterUsersLimited")
  .get(getLimitedNewsLetterUsers);
newsLetterRouter
  .route("/newsLetterGroupsLimited")
  .get(getLimitedNewsLetterGroups);
newsLetterRouter
  .route("/newsLetterGroup")
  .post(addNewsLetterGroup)
  .get(getAllNewsLetterGroup);
newsLetterRouter.route("/donateUs").post(donateUs).get(handleKhaltiCallBack);

newsLetterRouter.route("/newsLetterUserGroupMap").post(addNewsUserGroupMap);
module.exports = newsLetterRouter;
