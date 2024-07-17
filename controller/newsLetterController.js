const { default: axios } = require("axios");
const newsLetterGroup = require("../models/newsLetterGroup");
const newsLetterUserGroupMap = require("../models/newsLetterUserGroupMap");
const newsletterUser = require("../models/newsletterUser");
const CatchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const nodemailer = require("nodemailer");
const DonationUserDetails = require("../models/CMSModels/donationUserDetail");
const DonationDetail = require("../models/CMSModels/donationDetail");

exports.addNewsLetterUser = CatchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;
  const user = await newsletterUser.findOne({ email: email });
  if (user) {
    let error = {
      message: "Email Already Exists",
      status: 409,
    };
    next(error);
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
const { getImageUrl } = require("../utils/fileHandling");

exports.donateUs = CatchAsyncError(async (req, res, next) => {
  var options = {
    method: "POST",
    url: "https://a.khalti.com/api/v2/epayment/initiate/",
    headers: {
      Authorization: `key ${process.env.KHALTI_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      return_url: req.body.return_url,
      website_url: req.body.website_url,
      amount: req.body.amount,
      purchase_order_id: req.body.purchase_order_id,
      purchase_order_name: req.body.purchase_order_name,
      customer_info: {
        name: req.body.customer_info.name,
        email: req.body.customer_info.email,
        phone: req.body.customer_info.phone,
      },
    }),
  };
  request(options, async function (error, response) {
    if (error) throw next(error);
    if (response.body) {
      let resData = JSON.parse(response.body);
      if (resData.status_code) {
        next({ status: resData.status_code, message: "something went worng" });
      } else {
        res
          .status(201)
          .json({ success: true, responseData: JSON.parse(response.body) });
        try {
          let customer_info = {
            name: req.body.customer_info.name,
            email: req.body.customer_info.email,
            phone: req.body.customer_info.phone,
          };
          let data = new DonationUserDetails({
            purchase_order_id: req.body.purchase_order_id,
            customer_info: customer_info,
          });
          await data.save();
        } catch (error) {
          next(error);
        }
      }
    }
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
  // if()
  if (req.query.status == "Completed") {
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      { headers }
    );

    if (response.data) {
      let newData = new DonationDetail({
        pidx: response.data.pidx,
        total_amount: response.data.total_amount,
        status: response.data.status,
        transaction_id: response.data.transaction_id,
        fee: response.data.fee,
        refunded: response.data.refunded,
        purchase_order_id: req.query.purchase_order_id,
      });
      await newData.save();
      res.redirect(`${process.env.FONTEND_SERVER_PATH}/donation`);
    }
  } else {
    res.redirect(`${process.env.FONTEND_SERVER_PATH}/donation`);
  }
});
const mongoose = require("mongoose");
const { BACKEND_SERVER_PATH } = require("../config/config");

exports.sendNewsLetterToGroups = CatchAsyncError(async (req, res, next) => {
  const reqData = req.body;
  const groupIds = reqData.groups.map((group) => group._id);
  const content = req.body.content;
  const subject = req.body.subject;
  const result = await newsLetterUserGroupMap.aggregate([
    {
      $match: {
        groupId: { $in: groupIds.map((id) => new mongoose.Types.ObjectId(id)) },
      }, // Match documents with the specified group ID
    },
    {
      $lookup: {
        from: "newsletter_users", // Name of the NewsLetterUser collection
        localField: "userId",
        foreignField: "_id",
        as: "user", // Output field containing the matched user document
      },
    },
    {
      $unwind: "$user", // Deconstruct the user array to get individual user documents
    },
    {
      $project: {
        _id: 0, // Exclude the _id field from the output
        email: "$user.email", // Project the email field from the user document
      },
    },
  ]);
  const mappedEmails = result.map((e) => e.email);

  const file = req.body.file;
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Use the appropriate email service
    auth: {
      user: "newsletterkoshish@gmail.com", // Your email address
      pass: "wkoj vlwi vbab fecp", // Your email password or application-specific password
    },
  });
  let mailOptions;

  if (req.body.isGetInvolved) {
    mailOptions = {
      from: reqData.groups[0] ? reqData.groups[0] : "", // Sender address
      to: "recruit@koshish.org.np", // List of recipients
      subject: subject && subject !== "" ? subject : "News Letter", // Subject line
      text: content && content !== "" ? content : "", // Plain text body
      attachments: [
        {
          path: file, // File path
        },
      ],
    };
  } else {
    mailOptions = {
      from: "test@ishanitech.com", // Sender address
      to: mappedEmails, // List of recipients
      subject: subject && subject !== "" ? subject : "News Letter", // Subject line
      text: content && content !== "" ? content : "", // Plain text body
      attachments: [
        {
          path: file, // File path
        },
      ],
    };
  }

  // Send email with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error("Error occurred while sending email:", error);
    }
    console.log("Message sent: %s", info.messageId);
  });

  res.status(201).json({
    success: true,
    data: "",
  });
});

exports.updateGroup = async (req, res, next) => {
  try {
    const selectedGroupId = req.params.groupId;
    const newName = req.body.name;

    // Find the group to ensure it exists
    const group = await newsLetterGroup.findOne({
      _id: selectedGroupId.toString(),
    });

    if (!group) {
      console.log("Group not found");
      return res
        .status(404)
        .json({ success: false, message: "Group not found" });
    }

    // Update the group's name
    await newsLetterGroup.updateOne(
      { _id: selectedGroupId },
      { $set: { name: newName } }
    );

    // Update the name in user group mapping
    await newsLetterUserGroupMap.updateMany(
      { groupId: selectedGroupId },
      { $set: { groupName: newName } }
    );

    return res.status(200).json({
      success: true,
      message: "Group and associated users updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
};

exports.deleteGroup = async (req, res, next) => {
  try {
    const selectedGroupId = req.params.groupId;

    const group = await newsLetterGroup.findOne({
      _id: selectedGroupId.toString(),
    });

    if (!group) {
      console.log("Group not found");
      return res
        .status(404)
        .json({ success: false, message: "Group not found" });
    }

    await newsLetterGroup.deleteOne({ _id: selectedGroupId });

    await newsLetterUserGroupMap.deleteMany({ groupId: selectedGroupId });

    return res.status(200).json({
      success: true,
      message: "Group and associated users deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const selectedUserId = req.params.userId;

    const user = await newsletterUser.findOne({
      _id: selectedUserId.toString(),
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await newsletterUser.deleteOne({ _id: selectedUserId });

    await newsLetterUserGroupMap.deleteMany({ userId: selectedUserId });

    return res.status(200).json({
      success: true,
      message: " users deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
};
