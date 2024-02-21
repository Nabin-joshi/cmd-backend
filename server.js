const express = require("express");
const dbConnection = require("./database/index");
const { PORT } = require("./config/config");
const router = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const error = require("./utils/error");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", router);

dbConnection();

// to host static file like images
app.use(
  "/public/images",
  express.static(path.join(process.env.FILE_PATH, "images"))
);
app.use("/public/images", express.static("public/images"));
app.use("/public/videos", express.static("public/videos"));

// app.use(errorHandler);
app.use(error);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
