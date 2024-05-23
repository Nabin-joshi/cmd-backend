const fs = require("fs");
const { BACKEND_SERVER_PATH } = require("../config/config");
exports.deletepreviousPhotos = (originalImage) => {
  const prevImagePath = `${process.env.FILE_PATH}/images/${originalImage}`;
  try {
    fs.unlinkSync(prevImagePath);
  } catch (error) {
    console.log("Error removing image:", error);
  }
};

exports.storeImage = (newImage, id) => {
  const newTransformedImage = newImage.replace(/^data:image\/\w+;base64,/, "");
  const randomNumber = this.randomNumberGenerator();
  const iconBuffer = Buffer.from(newTransformedImage, "base64");
  const iconPath = `${
    process.env.FILE_PATH
  }/images/Image_${randomNumber}.${newImage.slice(11, 15)}`;
  fs.writeFileSync(iconPath, iconBuffer);
  const imageName = iconPath.split("/").pop();
  return imageName;
};

exports.randomNumberGenerator = () => {
  const genRanHex = (size) =>
    [...Array(size)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");
  let currentDate = new Date();
  let currentDay = currentDate.getDate();
  let currentMonth = currentDate.getMonth() + 1;
  let currentYear = currentDate.getFullYear();
  let tokenId =
    "LMC_" +
    currentYear +
    currentMonth +
    currentDay +
    genRanHex(5).toUpperCase();
  return tokenId;
};

exports.getImageUrl = (iconName) =>
  `${BACKEND_SERVER_PATH}/public/images/${encodeURIComponent(iconName)}`;
