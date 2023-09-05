const Bookings = require("../models/Bookings");
const User = require("../models/Users");
const { StatusCodes } = require("http-status-codes");

const bookingDateOverlapCheck = async (startDate, userId) => {
  let userBookings = await User.findById(userId, { _id: 0, userBookings: 1 });

  userBookings = userBookings.userBookings;

  let bookingsByUser = [];
  if (userBookings.length !== 0) {
    bookingsByUser = await Promise.all(
      userBookings.map(async (bookingId) => {
        return await Bookings.findById(bookingId, {
          _id: 0,
          startDate: 1,
          endDate: 1,
        });
      })
    );
  }

  if (bookingsByUser.length !== 0) {
    for (let i = 0; i < bookingsByUser.length; i++) {
      if (
        new Date(startDate).getTime() >=
          bookingsByUser[i].startDate.getTime() &&
        new Date(startDate).getTime() <= bookingsByUser[i].endDate.getTime()
      ) {
        let err = new Error("You have a booking on the same date");
        err.status = StatusCodes.BAD_REQUEST;
        throw err;
      }
    }
  }
};

module.exports = bookingDateOverlapCheck;
