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
    url: "https://khalti.com/api/v2/epayment/initiate/",
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
      "https://khalti.com/api/v2/epayment/lookup/",
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

// Himalayan Bank Controller
const jose = require("node-jose");
const jwt = require("jsonwebtoken");
const { JWK, JWE, JWS } = require("jose");
const { camelCase } = require("lodash");
const { createPublicKey } = require("crypto");
const crypto = require("crypto");

const getEncryptedSignedToken = (obj, apiKey, objectKey) => {
  if (!obj) {
    throw new Error("obj cannot be null or undefined");
  }

  if (!apiKey) {
    throw new Error("apiKey cannot be null or undefined");
  }

  const jObj = {
    [camelCase(objectKey)]: obj,
    aud: "PacoAudience",
    iss: "PacoIssuer",
  };
  const signingKey = process.env.MerchantSigningPrivate;
  const encryptingKey = process.env.PacoPublicKey;

  const signedToken = JWS.sign(jObj, signingKey, { algorithm: "PS256" });

  const encryptedToken = JWE.encrypt(signedToken, encryptingKey);

  return encryptedToken;
};

const getPublicKey = (key) => {
  const publicKeyDecoded = Buffer.from(key, "base64");

  const rsaKey = createPublicKey({
    key: publicKeyDecoded,
    format: "der",
    type: "spki",
  });

  const jwk = JWK.asKey(rsaKey, "pem");
  jwk.kid = "7664a2ed0dee4879bdfca0e8ce1ac313";

  return jwk;
};

function getPrivateKey(key) {
  const privateKeyDecoded = Buffer.from(key, "base64");

  const rsaKey = createPrivateKey({
    key: privateKeyDecoded,
    format: "der",
    type: "pkcs8",
  });

  const jwk = JWK.asKey(rsaKey, "pem");

  return jwk;
}

function getEncryptingPublicKey(key) {
  const publicKey = getPublicKey(key);
  const alg = "RSA-OAEP";
  const enc = "A128CBC-HS256";

  return { key: publicKey, alg, enc };
}

function encryptedJwt(apiKey, message) {
  if (!apiKey) {
    throw new Error("apiKey is required");
  }

  const handler = new jose.SignJWT(); // Assuming using `jose` for JWT handling.

  const jobj = {
    request: message,
    iss: apiKey,
    aud: "PacoAudience",
    CompanyApiKey: apiKey,
  };

  const signingKey = process.env.MerchantSigningPrivate;
  const encryptingKey = process.env.PacoPublicKey;

  const signingCredentials = {
    key: signingKey,
    alg: "PS256", // Equivalent to RsaSsaPssSha256
  };

  const encryptingCredentials = {
    key: encryptingKey,
    alg: "RSA-OAEP",
    enc: "A128CBC-HS256",
  };

  // Signing the token
  const token = handler
    .setProtectedHeader({ alg: signingCredentials.alg })
    .setPayload(jobj)
    .sign(signingCredentials.key);

  // Encrypting the token
  const encryptedToken = jose.JWE.encrypt(token, encryptingCredentials.key, {
    alg: encryptingCredentials.alg,
    enc: encryptingCredentials.enc,
  });

  return encryptedToken;
}

async function decryptJwt(apiKey, request) {
  const { jwtVerify, compactDecrypt, decodeJwt } = require("jose");

  if (!request) {
    return null;
  }

  // Get keys
  const sign = process.env.PacoSigningPublic;
  const enc = process.env.EncryptedPrivateKey;

  try {
    // Decrypt the token
    const { plaintext: decryptedToken } = await compactDecrypt(request, enc);

    // Validate the token
    const { payload, protectedHeader } = await jwtVerify(decryptedToken, sign, {
      audience: ["PacoAudience", apiKey],
      issuer: "PacoIssuer",
      algorithms: ["PS256"], // Equivalent to RsaSsaPssSha256
    });

    // Decode the payload
    const encodedPayload = decodeJwt(decryptedToken);
    const json = JSON.stringify(payload);

    return json;
  } catch (err) {
    console.error("Token decryption/validation failed:", err);
    return null;
  }
}

exports.initiatePayment = async (req, res, next) => {
  const accessToken = "e6c5e2756e2e41878c852bce8d208632";
  const cardNumber = "4706860000002325";
  const cardExpiry = "1225";
  const cardCvv = "761";
  const cardPayer = "Demo Sample";
  const amount = 1000.0;
  const amountText = "000000100000";
  const amountCurrency = "THB";
  const decimalPlaces = 2;
  const request3dsFlag = "N";
  const officeId = "DEMOOFFICE";

  const paymentEndpoint =
    "https://payment-api.demo-paco.2c2p.com/1.0/Payment/paymentUi";

  const stringRequest = {
    apiRequest: {
      requestMessageID: crypto.randomUUID(),
      requestDateTime: new Date().toISOString(),
      language: "en-US",
    },
    officeId: officeId,
    orderNo: Date.now().toString(),
    productDescription: `desc for ${Date.now()}`,
    paymentType: "CC",
    paymentCategory: "ECOM",
    creditCardDetails: {
      cardNumber: cardNumber,
      cardExpiryMMYY: cardExpiry,
      cvvCode: cardCvv,
      payerName: cardPayer,
    },
    storeCardDetails: {
      storeCardFlag: "N",
      storedCardUniqueID: "{{guid}}",
    },
    installmentPaymentDetails: {
      ippFlag: "N",
      installmentPeriod: 0,
      interestType: null,
    },
    mcpFlag: "N",
    request3dsFlag: request3dsFlag,
    transactionAmount: {
      amountText: amountText,
      currencyCode: amountCurrency,
      decimalPlaces: decimalPlaces,
      amount: amount,
    },
    notificationURLs: {
      confirmationURL: "http://example-confirmation.com",
      failedURL: "http://example-failed.com",
      cancellationURL: "http://example-cancellation.com",
      backendURL: "http://example-backend.com",
    },
    deviceDetails: {
      browserIp: "1.0.0.1",
      browser: "Postman Browser",
      browserUserAgent: "PostmanRuntime/7.26.8 - not from header",
      mobileDeviceFlag: "N",
    },
    purchaseItems: [
      {
        purchaseItemType: "ticket",
        referenceNo: "2322460376026",
        purchaseItemDescription: "Bundled insurance",
        purchaseItemPrice: {
          amountText: amountText,
          currencyCode: amountCurrency,
          decimalPlaces: decimalPlaces,
          amount: amount,
        },
        subMerchantID: "string",
        passengerSeqNo: 1,
      },
    ],
    customFieldList: [
      {
        fieldName: "TestField",
        fieldValue: "This is test",
      },
    ],
  };

  try {
    // Generate an RSA key pair
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    });

    // Create JWT with signing
    const jwtToken = jwt.sign(stringRequest, privateKey, {
      algorithm: "RS256",
      expiresIn: "1h",
      audience: "PacoAudience",
      issuer: accessToken,
    });

    // Create a JWK key object from the public key
    const keyStore = await jose.JWK.createKeyStore();
    const jwkPublicKey = await keyStore.add(publicKey, "pem");

    // Encrypt the JWT
    const encryptor = jose.JWE.createEncrypt(
      {
        format: "compact",
        algorithm: "RSA-OAEP",
        encryption: "A256CBC-HS512",
      },
      jwkPublicKey
    );

    const encryptedJWT = await encryptor.update(jwtToken).final();

    // Make the HTTP POST request
    const response = await axios.post(paymentEndpoint, encryptedJWT, {
      headers: {
        "Content-Type": "application/jose",
        CompanyApiKey: accessToken,
        Accept: "application/jose",
      },
    });

    res.status(201).json({ success: true, responseData: response.data });
  } catch (error) {
    console.error("Error executing payment:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Payment initiation failed." });
  }
};

// exports.paymentCallback = async (req, res, next) => {
//   const accessToken = "e6c5e2756e2e41878c852bce8d208632";
//   const orderNo = "1635476979216";
//   const officeId = "DEMOOFFICE";
//   const PaymentEndpoint = "https://core.demo-paco.2c2p.com/";

//   try {
//     const httpClient = axios.create({
//       baseURL: PaymentEndpoint,
//       headers: {
//         apiKey: accessToken,
//       },
//     });

//     const stringRequest = JSON.stringify({
//       apiRequest: {
//         requestMessageID: crypto.randomUUID(),
//         requestDateTime: new Date().toISOString(),
//         language: "en-US",
//       },
//       advSearchParams: {
//         controllerInternalID: null,
//         officeId: [officeId],
//         orderNo: [orderNo],
//         invoiceNo2C2P: null,
//         fromDate: "0001-01-01T00:00:00",
//         toDate: "0001-01-01T00:00:00",
//         amountFrom: null,
//         amountTo: null,
//       },
//     });

//     const apiResponse = await httpClient.get(
//       "api/1.0/Inquiry/transactionDetails",
//       stringRequest,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     res.status(200).json({ success: true, responseData: apiResponse });
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// };

exports.paymentCallbackTransactionList = async (req, res, next) => {
  const accessToken = "e6c5e2756e2e41878c852bce8d208632";
  const orderNo = "1635476979216";
  const officeId = "DEMOOFFICE";
  const paymentEndpoint =
    "https://core.demo-paco.2c2p.com/api/1.0/Inquiry/transactionList"; // Replace with your actual payment endpoint

  try {
    const requestBody = {
      apiRequest: {
        requestMessageID: crypto.randomUUID(), // Function to generate a GUID
        requestDateTime: new Date().toISOString(),
        language: "en-US",
      },
      advSearchParams: {
        controllerInternalID: null,
        officeId: [officeId],
        orderNo: [orderNo],
        invoiceNo2C2P: null,
        fromDate: "0001-01-01T00:00:00",
        toDate: "0001-01-01T00:00:00",
        amountFrom: null,
        amountTo: null,
      },
    };

    const response = await fetch(`${paymentEndpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: accessToken,
      },
      body: JSON.stringify(requestBody),
    });

    res.status(200).json({ success: true, responseData: response });
  } catch (error) {
    res.status(500).json({ error: error });
    throw error; // Rethrow the error
  }
};
