const { BACKEND_SERVER_PATH } = require("../../config/config");
const NavLinks = require("../../models/CMSModels/navLinks");
const equalizeArrayLengths = require("../equalizeController");
const uuid = require("uuid");

const createNavLinks = async (req, res, next) => {
  const { locale, navlink } = req.body;

  let newNavLink;

  try {
    newNavLink = new NavLinks({ locale, navlink });
    await newNavLink.save();
    return res.status(201).json({ msg: "NavLinks Created successfully" });
  } catch (err) {
    return next(err);
  }
};

const getAllNavLinks = async (req, res, next) => {
  try {
    let navLinks = await NavLinks.find();
    let emptyLinks = {
      name: "",
      content: "",
      key: "",
      link: "",
      pageBannerText: "",
      pageBannerImage: "",
    };
    navLinks = equalizeArrayLengths(navLinks, "navlink", emptyLinks);

    navLinks.forEach((Links) => {
      Links.navlink = Links.navlink.map((item) => {
        if (item.pageBannerImage && item.pageBannerImage !== "") {
          item.pageBannerImage = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
            item.pageBannerImage
          )}`;
          return item;
        } else {
          return item;
        }
      });
    });
    if (navLinks) {
      return res.status(200).json(navLinks);
    }
    res.status(200).json(navLinks);
  } catch (err) {
    return next(err);
  }
};

const updateNavLink = async (req, res, next) => {
  const locale = req.params.locale;
  const data = req.body;
  if (!locale) {
    res.status(400).json({ msg: "Invalid request" });
  }
  let selectedData;
  try {
    selectedData = await NavLinks.findOne({ locale: locale });
    console.log(selectedData.navlink);
    let individualNavLinks = selectedData.navlink.find(
      (item) => item.id === data._id
    );
    if (individualNavLinks) {
      individualNavLinks.name = data.name ? data.name.trim() : "";
      individualNavLinks.content = data.content;
      individualNavLinks.pageBannerText = data.pageBannerText;
      if (req.file) {
        individualNavLinks.pageBannerImage = req.file.filename;
      }
      await selectedData.save();
      res.status(201).json({ msg: "NavLinks Updated Successfully" });
    } else {
      let newData = {
        name: data.name ? data.name.trim() : "",
        content: data?.content ?? "",
        pageBannerText: data?.pageBannerText ?? "",
        pageBannerImage: req.file ? req.file.filename : "",
      };
      selectedData.navlink.push(newData);
      selectedData.save();
      res.status(201).json();
    }
  } catch (err) {
    return next(err);
  }
};

const deleteNavLinks = async (req, res, next) => {
  let locale = req.params.locale;
  const id = req.query.id;

  try {
    let navlinks = await NavLinks.findOne({ locale: locale });
    const indexToDelete = navlinks.navlink.findIndex(
      (item) => item._id.toString() === id.toString()
    );

    if (indexToDelete !== -1) {
      navlinks.navlink.splice(indexToDelete, 1);
    }

    await navlinks.save();
    return res.status(201).json({ msg: "NavLink Deleted Successfully" });
  } catch (err) {
    return next(err);
  }
};

const getNavLinksByKey = async (req, res, next) => {
  let locale = req.params.locale;
  const key = req.query.key;

  try {
    let navlinks = await NavLinks.findOne({ locale: locale });
    navlinks.navlink = navlinks.navlink.map((item) => {
      if (item.pageBannerImage && item.pageBannerImage !== "") {
        item.pageBannerImage = `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(
          item.pageBannerImage
        )}`;
      }
      return item;
    });
    let selectedData = navlinks.navlink.find((item) => item.key == key);
    if (selectedData) {
      return res.status(200).json(selectedData);
    }
  } catch (err) {
    return next(err);
  }
};

const getAllNavLinkHome = async (req, res, next) => {
  let locale = req.params.locale;
  try {
    let navlinks = await NavLinks.findOne({ locale: locale });
    if (navlinks && navlinks.navlink) {
      navlinks.navlink = navlinks.navlink.map(({ key, link, name }) => {
        return { key, link, name };
      });
    }
    res.status(200).json(navlinks);
  } catch (error) {
    return next(error);
  }
};

const updateNavTitle = async (req, res, next) => {
  const getData = req.body;
  const locale = req.params.locale;

  let selectedData;

  try {
    selectedData = await NavLinks.findOne({ locale: locale });
    if (selectedData) {
      await NavLinks.updateOne(
        { locale: locale },
        {
          navTitle: getData.navTitle,
        }
      );
    }
    return res.status(201).json({ msg: "NavTitle Updated Successfully" });
  } catch (error) {
    return next(error);
  }
};

const getNavTitle = async (req, res, next) => {
  let locale = req.params.locale;
  try {
    let navtitle = await NavLinks.findOne({ locale: locale });
    res.status(200).json(navtitle);
  } catch (error) {
    return next(error);
  }
};

const navLinkController = {
  create: createNavLinks,
  update: updateNavLink,
  getAll: getAllNavLinks,
  getAllHome: getAllNavLinkHome,
  getByKey: getNavLinksByKey,
  delete: deleteNavLinks,
  updateNavTitle: updateNavTitle,
  getNavTitle: getNavTitle,
};
module.exports = navLinkController;
