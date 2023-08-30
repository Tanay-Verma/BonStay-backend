const { StatusCodes } = require("http-status-codes");
const Users = require("../models/Users");

const register = async (req, res) => {
  const body = req.body;
  const user = await Users.findOne({ emailId: body.emailId });

  if (user) {
    let err = new Error(`User exists with email id ${body.emailId}`);
    err.status = StatusCodes.BAD_REQUEST;
    throw err;
  }

  const newUser = await Users.create(body);
  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: {
      message: `Successfully registered with user id ${newUser._id}`,
    },
  });
};

const login = async (req, res) => {
  const body = req.body;
  const user = await Users.findOne({ emailId: body.emailId });
  if (!user) {
    let err = new Error(
      `No user exists with email id ${body.emailId}, please register`
    );
    err.status = 404;
    throw err;
  }
  const isPasswordCorrect = await user.comparePassword(body.password);
  if (isPasswordCorrect) {
    res.cookie("userId", user._id).sendStatus(StatusCodes.CREATED);
  } else {
    let err = new Error("Incorrect password");
    err.status = StatusCodes.BAD_REQUEST;
    throw err;
  }
};

const logout = async (req, res) => {
  res.clearCookie("userId").status(StatusCodes.OK).json({
    status:"success",
    data:{
        message:"You are logged out!!"
    }
  });
};

module.exports = { register, login, logout };
