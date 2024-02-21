const multer = require("multer");
const path = require("path");
const fs = require("fs");

function getFileUploadMiddleware(destination, allowedExtensions) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination);
      }
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + "-" + file.originalname.trim();
      cb(null, uniqueName);
    },
  });

  const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname.trim()).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      cb(new Error("Only allowed file types are accepted!"), false);
    } else {
      cb(null, true);
    }
  };

  return multer({ storage, fileFilter });
}

module.exports = getFileUploadMiddleware;
