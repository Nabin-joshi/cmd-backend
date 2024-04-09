const mongoose = require("mongoose");
const { MONGODB_CONNECTION_STRING } = require("../config/config");
const { initializeDatabaseTables } = require("../utils/seeder");

const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(MONGODB_CONNECTION_STRING);
    console.log(`Database connected to host : ${conn.connection.host}`);
    initializeDatabaseTables();
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};

module.exports = dbConnection;
