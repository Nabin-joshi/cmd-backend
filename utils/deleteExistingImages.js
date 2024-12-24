const fs = require("fs");
const path = require("path");

/**
 * Deletes an existing image if it exists.
 * @param {string} imagePath - The relative or absolute path of the image to check and delete.
 * @returns {Promise<void>}
 */
const deleteImageIfExists = async (imagePath) => {
  try {
    // Resolve the absolute path (if necessary)
    const resolvedPath = path.isAbsolute(imagePath)
      ? imagePath
      : path.resolve("public", "images", imagePath);

    // Check if the file exists
    await fs.promises.access(resolvedPath, fs.constants.F_OK);

    // If file exists, delete it
    await fs.promises.unlink(resolvedPath);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("No existing image found to delete.");
    } else {
      console.error("Error deleting the image:", err);
      throw err;
    }
  }
};

module.exports = { deleteImageIfExists };
