const { StatusCodes } = require("http-status-codes");
const User = require("../models/Users");
const Hotel = require("../models/Hotels");

const addReview = async (req, res) => {
  const { userId } = req.cookies;
  const { hotelName, review } = req.body;
  const user = await User.findOne({
    _id: userId,
    hotelsStayedAt: { $in: [hotelName] },
  });
  if (!user) {
    let err = new Error("Cannot add a review until you stay at this hotel");
    err.status = StatusCodes.BAD_REQUEST;
    throw err;
  }

  const hotel = await Hotel.findOne({ hotelName: hotelName });
  if (!hotel) {
    let err = new Error("Cannot add a review until you stay at this hotel");
    err.status = StatusCodes.BAD_REQUEST;
    throw err;
  }

  await Hotel.findOneAndUpdate({ hotelName:hotelName }, { $push: { reviews: review } });
  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: {
      message: `Successfully added the review for ${hotelName}`,
    },
  });
};

const allReviews = async (req, res) => {
  const { hotelName } = req.params;
  const hotel = await Hotel.findOne({ hotelName }, { _id: 0, reviews: 1 });

  if (!hotel) {
    let err = new Error(`${hotelName} is not a valid hotel`);
    err.status = StatusCodes.BAD_REQUEST;
    throw err;
  }

  const hotelReviews = hotel.reviews;

  if (hotelReviews.length === 0) {
    let err = new Error(`No reviews added yet for ${hotelName}`);
    err.status = StatusCodes.BAD_REQUEST;
    throw err;
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    results: 1,
    data: {
      Reviews: hotelReviews,
    },
  });
};

module.exports = { addReview, allReviews };
