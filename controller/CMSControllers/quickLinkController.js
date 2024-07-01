const QuickLink = require("../../models/CMSModels/quickLink");

const createQuickLink = async (req, res, next) => {
  const { locale, quicklink } = req.body;

  let quicklinks;

  try {
    quicklinks = new QuickLink({ locale, quicklink });
    await quicklinks.save();
    return res.status(201).json({ msg: "QuickLink Created successfully" });
  } catch (err) {
    return next(err);
  }
};

const getAllQuickLinks = async (req, res, next) => {
  try {
    let quickLink = await QuickLink.find();
    return res.status(200).json(quickLink);
  } catch (err) {
    return next(err);
  }
};

const updateQuickLink = async (req, res, next) => {
  const data = req.body;
  const locale = req.params.locale;

  let selectedData;
  try {
    selectedData = await QuickLink.findOne({ locale: locale });

    let individualQuickLink = selectedData.quicklink.find(
      (item) => item.id === data.id
    );
    if (individualQuickLink) {
      individualQuickLink.title = data.title;
      individualQuickLink.href = data.href;

      await selectedData.save();
      res.status(201).json({ msg: "QuickLink Updated Successfully" });
    } else {
      let newData = {
        href: data.href,
        title: data.title,
      };
      selectedData.quicklink.push(newData);
      selectedData.save();
      res.status(201).json({ msg: "QuickLink saved Successfully" });
    }
  } catch (err) {
    return next(err);
  }
};

const deleteQuickLink = async (req, res, next) => {
  const id = req.query.id;
  let locale = req.params.locale;

  try {
    let selectedData = await QuickLink.findOne({ locale: locale });
    const indexToDelete = selectedData.quicklink.findIndex(
      (item) => item._id.toString() === id.toString()
    );

    if (indexToDelete !== -1) {
      selectedData.quicklink.splice(indexToDelete, 1);
    }

    await selectedData.save();
    return res.status(201).json({ msg: "QuickLink Deleted Successfully" });
  } catch (err) {
    return next(err);
  }
};

const QuickLinkController = {
  create: createQuickLink,
  update: updateQuickLink,
  getAll: getAllQuickLinks,
  delete: deleteQuickLink,
};
module.exports = QuickLinkController;
