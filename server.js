const express = require("express");
const dbConnection = require("./database/index");
const { PORT } = require("./config/config");
const router = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", router);

dbConnection();

// to host static file like images
app.use("/public/images", express.static("public/images"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
