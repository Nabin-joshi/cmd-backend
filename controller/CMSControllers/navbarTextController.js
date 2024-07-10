const NavBarTextModel = require("../../models/CMSModels/navbarText");

const createNavbarText = async (req, res, next) => {
  let { locale, mainMenuText, submenuText, headerText } = req.body;
  try {
    let newNavbarText = new NavBarTextModel({
      locale,
      mainMenuText,
      submenuText,
      headerText,
    });

    await newNavbarText.save();
    return res.status(201).json({ message: "Successfully Added" });
  } catch (error) {
    return next(error);
  }
};

const getNavbarText = async (req, res, next) => {
  let locale = req.params.locale;
  try {
    let selectedData = await NavBarTextModel.findOne({ locale: locale });
    return res.status(200).json(selectedData);
  } catch (error) {
    return next(error);
  }
};

const updateNavbarText = async (req, res, next) => {
  let locale = req.params.locale;
  let data = req.body;
  try {
    let selectedData = await NavBarTextModel.findOne({ locale: locale });
    if (selectedData) {
      selectedData.headerText.headerText1 = data.headerText.headerText1;

      selectedData.mainMenuText.menu1 = data.mainMenuText.menu1;
      selectedData.mainMenuText.menu2 = data.mainMenuText.menu2;
      selectedData.mainMenuText.menu3 = data.mainMenuText.menu3;
      selectedData.mainMenuText.menu4 = data.mainMenuText.menu4;

      selectedData.submenuText.menu1.subMenu1 = data.submenuText.menu1.subMenu1;
      selectedData.submenuText.menu1.subMenu2 = data.submenuText.menu1.subMenu2;
      selectedData.submenuText.menu1.subMenu3 = data.submenuText.menu1.subMenu3;
      selectedData.submenuText.menu1.subMenu4 = data.submenuText.menu1.subMenu4;
      selectedData.submenuText.menu1.subMenu5 = data.submenuText.menu1.subMenu5;

      selectedData.submenuText.menu2.subMenu1 = data.submenuText.menu2.subMenu1;
      selectedData.submenuText.menu2.subMenu2 = data.submenuText.menu2.subMenu2;
      selectedData.submenuText.menu2.subMenu3 = data.submenuText.menu2.subMenu3;
      selectedData.submenuText.menu2.subMenu4 = data.submenuText.menu2.subMenu4;
      selectedData.submenuText.menu2.submenu5 = data.submenuText.menu2.submenu5;

      selectedData.submenuText.menu3.subMenu1 = data.submenuText.menu3.subMenu1;
      selectedData.submenuText.menu3.subMenu2 = data.submenuText.menu3.subMenu2;
      selectedData.submenuText.menu3.subMenu3 = data.submenuText.menu3.subMenu3;
      selectedData.submenuText.menu3.subMenu4 = data.submenuText.menu3.subMenu4;

      selectedData.submenuText.menu4.subMenu1 = data.submenuText.menu4.subMenu1;
      selectedData.submenuText.menu4.subMenu2 = data.submenuText.menu4.subMenu2;
      selectedData.submenuText.menu4.subMenu3 = data.submenuText.menu4.subMenu3;
      selectedData.submenuText.menu4.subMenu4 = data.submenuText.menu4.subMenu4;

      await selectedData.save();
      return res.status(200).json({ message: "Successfully Updated" });
    }
  } catch (error) {
    return next(error);
  }
};

const getAllNavbarText = async (req, res, next) => {
  try {
    let data = await NavBarTextModel.find();
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const navbarTextController = {
  create: createNavbarText,
  get: getNavbarText,
  update: updateNavbarText,
  getAll: getAllNavbarText,
};

module.exports = navbarTextController;
