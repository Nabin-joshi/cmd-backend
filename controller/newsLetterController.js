const { default: axios } = require("axios");
const newsLetterGroup = require("../models/newsLetterGroup");
const newsLetterUserGroupMap = require("../models/newsLetterUserGroupMap");
const newsletterUser = require("../models/newsletterUser");
const CatchAsyncError = require("../utils/catchAsyncError");
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
  const { userIds, groupId } = req.body;

  // const userGroupMaps = await newsLetterUserGroupMap.find({ userId });
  // userGroupMaps.forEach((ug, index) => {
  //   if (ug.groupId.equals(groupId)) {
  //     next(new ErrorHandler(" Group is already assigned to the user ", 500));
  //   }
  // });

  const usersToGroupInfo = req.body;
  const datas = usersToGroupInfo.userIds.map((userId) => {
    return {
      groupId: usersToGroupInfo.groupId,
      userId,
    };
  });
  // const docs = await newsLetterUserGroupMap.insertMany(datas);

  const usersGroupInBulk = datas.map(({ groupId, userId }) => ({
    updateOne: {
      filter: { userId, groupId },
      update: { userId, groupId },
      upsert: true,
    },
  }));

  newsLetterUserGroupMap.bulkWrite(usersGroupInBulk);
  res
    .status(201)
    .json({ success: true, savedNewUserGroupMapEntity: usersGroupInBulk });
});

var request = require("request");
const { updateOne } = require("../models/users");

exports.donateUs = CatchAsyncError(async (req, res, next) => {
  let amount = parseFloat(req.body.amount) * 100;
  const custInfo = req.body.customer_info;
  var options = {
    method: "POST",
    url: "https://a.khalti.com/api/v2/epayment/initiate/",
    headers: {
      Authorization: `key ${process.env.KHALTI_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      return_url: "http://localhost:5000/api/newsLetter/donateUs",
      website_url: "https://localhost:3000/",
      amount: amount,
      purchase_order_id: "Order01",
      purchase_order_name: "test",
      customer_info: custInfo,
    }),
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    res
      .status(201)
      .json({ success: true, responseData: JSON.parse(response.body) });
  });
});

exports.handleKhaltiCallBack = CatchAsyncError(async (req, res, next) => {
  const {
    txnId,
    pidx,
    amount,
    mobile,
    purchase_order_id,
    purchase_order_name,
    transaction_id,
    message,
  } = req.query;
  if (message) {
    return res
      .status(400)
      .json({ success: false, error: message || "Error processing khalti" });
  }

  const headers = {
    Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
    "Content-Type": "application/json",
  };

  const response = await axios.post(
    "https://a.khalti.com/api/v2/epayment/lookup/",
    { pidx },
    { headers }
  );
  console.log(response.data);
  if (response.data.status !== "Completed") {
    return res.status(400).json({ error: "Payment not completed" });
  }
  console.log(purchase_order_id, pidx);
  req.transaction_uuid = purchase_order_id;
  req.transaction_code = pidx;
  // const html = `<a href="http://localhost:3000">gotomainpage</a> `;
  // return res
  //   .status(201)
  //   .json({ success: true, transactionInfo: response.data });
});