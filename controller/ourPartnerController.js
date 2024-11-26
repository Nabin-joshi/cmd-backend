const OurPartner = require("../models/ourPartner");

const { BACKEND_SERVER_PATH } = require("../config/config");
const equalizeArrayLengths = require("./equalizeController");

// Our Partner
const createOurPartner = async (req, res, next) => {
  const { heading, locale, partner } = req.body;

  let newOurPatners;

  try {
    newOurPatners = new OurPartner({ heading, locale, partner });
    await newOurPatners.save();
    return res.status(201).json({ msg: "Our Partner Created successfully" });
  } catch (err) {
    return next(err);
  }
};

const updateOurPartner = async (req, res, next) => {
  const locale = req.params.locale;
  const data = req.body;

  let selectedData;
  try {
    selectedData = await OurPartner.findOne({ locale: locale });

    let individualPartner = selectedData.partner.find(
      (item) => item.id === data.id
    );
    if (individualPartner) {
      individualPartner.content = data.content;
      individualPartner.type = data.type;
      if (req.file) {
        individualPartner.image = req.file.filename;
      }

      await selectedData.save();
      res.status(201).json({ msg: "Partner Updated Successfully" });
    } else {
      let newData = {
        image: req.file ? req.file.filename : "",
        content: data.content,
        type: data.type,
      };
      selectedData.partner.push(newData);
      selectedData.save();
      res.status(201).json({ msg: "Partner saved Successfully" });
    }
  } catch (err) {
    return next(err);
  }
};

const updateOurPartnerHeading = async (req, res, next) => {
  const getData = req.body;
  const locale = req.params.locale;

  let selectedData;

  try {
    selectedData = await OurPartner.findOne({ locale: locale });
    if (selectedData) {
      await OurPartner.updateOne(
        { locale: locale },
        {
          heading: getData.heading,
        }
      );
    }
    return res
      .status(201)
      .json({ msg: "Our Partner Heading Updated Successfully" });
  } catch (error) {
    return next(error);
  }
};

const getOurPartner = async (req, res, next) => {
  let locale = req.params.locale;

  try {
    let ourPartner = await OurPartner.findOne({ locale: locale });
    ourPartner.partner = ourPartner.partner.map((item) => {
      if (item.image && item.image !== "") {
        item.image = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
          item.image
        )}`;
        return item;
      } else {
        return item;
      }
    });
    if (ourPartner) {
      return res.status(200).json(ourPartner);
    }
  } catch (err) {
    return next(err);
  }
};

const getAllOurPartner = async (req, res, next) => {
  try {
    let ourPartner = await OurPartner.find();
    let emptyPartner = {
      image: "",
      content: "",
      type: "",
    };
    ourPartner = equalizeArrayLengths(ourPartner, "partner", emptyPartner);
    ourPartner.forEach((ourpartner) => {
      ourpartner.partner = ourpartner.partner.map((item) => {
        if (item.image && item.image !== "") {
          item.image = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
            item.image
          )}`;
          return item;
        } else {
          return item;
        }
      });
    });
    if (ourPartner) {
      return res.status(200).json(ourPartner);
    }
  } catch (err) {
    return next(err);
  }
};

const deleteOurPartner = async (req, res, next) => {
  let locale = req.params.locale;
  const id = req.query.id;

  try {
    let ourPartner = await OurPartner.findOne({ locale: locale });
    const indexToDelete = ourPartner.partner.findIndex(
      (item) => item._id.toString() === id.toString()
    );

    if (indexToDelete !== -1) {
      ourPartner.partner.splice(indexToDelete, 1);
    }

    await ourPartner.save();
    return res.status(201).json({ msg: "Our Partner Deleted Successfully" });
  } catch (err) {
    return next(err);
  }
};

const ourPartnerController = {
  createOurPartner,
  updateOurPartnerHeading,
  updateOurPartner,
  getAllOurPartner,
  getOurPartner,
  deleteOurPartner,
};

module.exports = ourPartnerController;
