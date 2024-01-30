const ErrorHandler = require("./errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      errormessage: err.message,
      stack: err.stack,
      error: err,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    if (error.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    } else {
      const message = `finally error come:  ${error}`;
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      errormessage: error.message || "Internal Server Errror",
    });
  }
};
