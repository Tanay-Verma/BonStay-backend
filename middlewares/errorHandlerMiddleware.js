const {StatusCodes} = require("http-status-codes")
const errorHandler = (err, req, res, next) => {
  if (err) {
    const customError = {
      statusCode: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message || "Something went wrong please try again later...",
    };

    res
      .status(customError.statusCode)
      .json({ status: "error", data: { message: customError.message } });
  }
  return next();
};

module.exports = errorHandler;
