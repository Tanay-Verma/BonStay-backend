const Bookings = require("../models/Bookings");
const User = require("../models/Users");
const Hotel = require("../models/Hotels");
const { StatusCodes } = require("http-status-codes");
const bookingDateOverlapCheck = require("../utils/bookingDateOverlapCheck");

const bookARoom = async (req, res) => {
  const { userId, hotelName } = req.params;
  const cookie = req.cookies;
  const { startDate } = req.body;

  if (userId !== cookie.userId) {
    let err = new Error("Not a valid User Id");
    err.status = StatusCodes.BAD_REQUEST;
    throw err;
  }

  const hotel = await Hotel.findOne({ hotelName: hotelName });
  if (!hotel) {
    let err = new Error("Not a valid Hotel Name");
    err.status = StatusCodes.BAD_REQUEST;
    throw err;
  }

  try {
    await bookingDateOverlapCheck(startDate, userId);
  } catch (error) {
    throw error;
  }

  const booking = await Bookings.create({ ...req.body, hotelName: hotelName });
  await User.findByIdAndUpdate(userId, {
    $push: { userBookings: booking._id },
    $addToSet: { hotelsStayedAt: hotelName },
  });

  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: {
      message: `Successfully made a booking with booking id ${booking._id}`,
    },
  });
};

const rescheduleBooking = async (req, res) => {
  const { userId } = req.params;
  const { bookingId, startDate, endDate } = req.body;
  const user = await User.findById(userId, { _id: 0, userBookings: 1 });
  if (!user) {
    let err = new Error("Not a valid User Id");
    err.status = StatusCodes.BAD_REQUEST;
    throw err;
  }
  if (!user.userBookings.includes(bookingId)) {
    let err = new Error("Not a valid Booking Id");
    err.status = StatusCodes.BAD_REQUEST;
    throw err;
  }

  try {
    await bookingDateOverlapCheck(startDate, userId);
  } catch (error) {
    throw error;
  }

  await Bookings.findByIdAndUpdate(bookingId, { $set: { startDate, endDate } });

  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: {
      message: `Successfully rescheduled the booking with booking id ${bookingId}`,
    },
  });
};

const cancelBooking = async (req, res) => {
  const { userId, bookingId } = req.params;
  let userBookings = await User.findById(userId, { _id: 0, userBookings: 1 });
  userBookings = userBookings.userBookings;
  if (userBookings.length === 0 || !userBookings.includes(bookingId)) {
    let err = new Error("Could not delete the booking");
    err.status = StatusCodes.BAD_REQUEST;
    throw err;
  }

  await Bookings.findByIdAndDelete(bookingId);
  await User.findByIdAndUpdate(userId, { $pull: { userBookings: bookingId } });

  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: {
      message: `Successfully deleted the booking with booking id ${bookingId}`,
    },
  });
};

const getAllBookings = async (req, res) => {
  const { userId } = req.params;
  let userBookings = await User.findById(userId, { _id: 0, userBookings: 1 });
  userBookings = userBookings.userBookings;

  if (userBookings === 0) {
    let err = new Error("No Bookings done yet");
    err.status = StatusCodes.BAD_REQUEST;
    throw err;
  }

  const bookings = await Promise.all(
    userBookings.map(async (bookingId) => {
      return await Bookings.findById(bookingId);
    })
  );

  res.status(StatusCodes.OK).json({
    status: "success",
    results: 1,
    data: {
      UserBookings: bookings,
    },
  });
};

module.exports = {
  bookARoom,
  rescheduleBooking,
  cancelBooking,
  getAllBookings,
};
