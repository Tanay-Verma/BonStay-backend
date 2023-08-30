const {StatusCodes} = require("http-status-codes")

const validation = (schema) => async (req, res, next) => {
  const body = req.body;

  try {
    await schema.validate(body);
    return next();
  } catch (error) {
    let err = new Error(error.message);
    err.status = StatusCodes.BAD_REQUEST;
    throw err;
  }
};

module.exports = validation;
