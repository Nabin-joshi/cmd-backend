const newsLetterGroup = require("../models/newsLetterGroup");
const newsLetterUserGroupMap = require("../models/newsLetterUserGroupMap");
const newsletterUser = require("../models/newsletterUser");
const CatchAsyncError = require("../utils/CatchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

exports.addNewsLetterUser = CatchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;
  const user = await newsletterUser.findOne({ email: email });
  if (user) {
    next(new Error("email already exists !", 400));
  }
  const newsLetterUser = new newsletterUser({
    name,
    email,
  });
  const savedNewsLetterUser = await newsLetterUser.save();
  res.status(201).json({
    success: true,
    savedNewsLetterUser,
  });
});

exports.getAllNewsLetterUser = CatchAsyncError(async (req, res, next) => {
  const newsLetterUsers = await newsletterUser.find();
  if (newsLetterUsers.length <= 0) {
    return next(new ErrorHandler("Users not found !!"));
  }
  let newsLetterUsersWithGroups = [];
  // newsLetterUsers.forEach(async (item, index) => {
  for (let i = 0; i < newsLetterUsers.length; i++) {
    const newUser = { ...newsLetterUsers[i]._doc };

    const id = newsLetterUsers[i]._id;
    const groupUserMap = await newsLetterUserGroupMap.find({ userId: id });
    let groupList = [];
    // groupUserMap.forEach(async (group, index) => {
    for (let j = 0; j < groupUserMap.length; j++) {
      let singleGroup = await newsLetterGroup.findById(groupUserMap[j].groupId);
      groupList.push(singleGroup);
    }

    // });
    newUser.groups = groupList;
    // newsLetterUsers[i].groups = groupList;
    newsLetterUsersWithGroups.push(newUser);
    // newsLetterUsersWithGroups.push(newsLetterUsers[i]);
    // console.log(newsLetterUsers);
  }
  // console.log(newsLetterUsersWithGroups);
  // });
  // const newsLetterUserse = await newsletterUser.aggregate([
  //   {
  //     $lookup: {
  //       from: "news_letter_user_group_map", // The name of the other collection
  //       localField: "_id",
  //       foreignField: "userId",
  //       as: "userGroups",
  //     },
  //   },
  //   {
  //     $unwind: {
  //       path: "$userGroups",
  //       preserveNullAndEmptyArrays: true, // Preserve users without groups
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "news_letter_groups", // The name of the groups collection
  //       localField: "userGroups.groupId",
  //       foreignField: "_id",
  //       as: "groups",
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: "$_id",
  //       name: { $first: "$name" },
  //       email: { $first: "$email" },
  //       groups: { $push: "$groups" },
  //     },
  //   },
  // ]);
  res.status(200).json({
    success: true,
    newsLetterUsers: newsLetterUsersWithGroups,
  });
});

exports.getLimitedNewsLetterUsers = CatchAsyncError(async (req, res, next) => {
  const { emailLike } = req.query;
  const regexPattern = new RegExp(emailLike, "i");
  const limitedUsers = await newsletterUser.find({
    email: { $regex: regexPattern },
  });
  res.status(201).json({
    success: true,
    limitedUsers,
  });
});

exports.addNewsLetterGroup = async (req, res, next) => {
  try {
    const { groupName } = req.body;
    const newsLetterGroupNew = new newsLetterGroup({
      name: groupName,
    });
    const savedNewsLetterUserGroup = await newsLetterGroupNew.save();
    res.status(201).json({ success: true, savedNewsLetterUserGroup });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

exports.getAllNewsLetterGroup = CatchAsyncError(async (req, res, next) => {
  const newsLetterGroups = await newsLetterGroup.find();

  if (newsLetterGroup.length <= 0) {
    return next(new ErrorHandler("no single groups found", 500));
  }

  res.status(201).json({
    success: true,
    newsLetterGroups,
  });
});

exports.getLimitedNewsLetterGroups = CatchAsyncError(async (req, res, next) => {
  const groupNameLike = req.query.groupNameLike;
  const regexPattern = new RegExp(groupNameLike, "i");
  const limitedGroups = await newsLetterGroup.find({
    name: { $regex: regexPattern },
  });
  res.status(201).json({
    success: true,
    limitedGroups,
  });
});

exports.addNewsUserGroupMap = CatchAsyncError(async (req, res, next) => {
  const { userId, groupId } = req.body;
  // const newsLetterUser = await newsletterUser.findOne({ _id: userId });
  // if (newsLetterUser) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "user is already assigned to some group",
  //   });
  // }
  const userGroupMaps = await newsLetterUserGroupMap.find({ userId });
  userGroupMaps.forEach((ug, index) => {
    if (ug.groupId.equals(groupId)) {
      next(new ErrorHandler(" Group is already assigned to the user ", 500));
    }
  });
  const newUserGroupMapEntity = new newsLetterUserGroupMap({
    userId,
    groupId,
  });
  const savedNewUserGroupMapEntity = await newUserGroupMapEntity.save();
  res.status(201).json({ success: true, savedNewUserGroupMapEntity });
});
