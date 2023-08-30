require("dotenv").config();
require("express-async-errors");

// Request logging
const morgan = require("morgan");

const cookieParser = require("cookie-parser");

// error handler
const errorHandler = require("./middlewares/errorHandlerMiddleware");

// routes
const authRouter = require("./routes/auth");
const hotelRouter = require("./routes/hotels")

// Express App
const express = require("express");
const app = express();

// connect to db
const connectDB = require("./db/connect");

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/", authRouter);
app.use("/", hotelRouter);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`App started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
