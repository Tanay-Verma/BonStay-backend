const router = require("express").Router();

// validation middleware
const validation = require("../middlewares/validationMiddleware");

// validation schema
const bookARoomSchema = require("../validations/bookARoomSchema");
const rescheduleBookingSchema = require("../validations/rescheduleBookingSchema");

const { bookARoom, rescheduleBooking, cancelBooking, getAllBookings } = require("../controllers/bookings");

router
  .route("/:userId/:hotelName")
  .post(validation(bookARoomSchema), bookARoom);

router
  .route("/:userId")
  .put(validation(rescheduleBookingSchema), rescheduleBooking);

router.route("/:userId/:bookingId").delete(cancelBooking);

router.route("/:userId").get(getAllBookings);

module.exports = router;
