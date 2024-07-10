const mongoose = require("mongoose");

const navbarText = new mongoose.Schema({
  locale: String,
  headerText: {
    headerText1: String,
  },
  mainMenuText: {
    menu1: String,
    menu2: String,
    menu3: String,
    menu4: String,
  },
  submenuText: {
    menu1: {
      subMenu1: String,
      subMenu2: String,
      subMenu3: String,
      subMenu4: String,
      subMenu5: String,
    },
    menu2: {
      subMenu1: String,
      subMenu2: String,
      subMenu3: String,
      subMenu4: String,
      submenu5: String,
    },
    menu3: {
      subMenu1: String,
      subMenu2: String,
      subMenu3: String,
      subMenu4: String,
    },
    menu4: {
      subMenu1: String,
      subMenu2: String,
      subMenu3: String,
      subMenu4: String,
    },
  },
});

const NavbarText = mongoose.model("NavbarText", navbarText);

module.exports = NavbarText;
