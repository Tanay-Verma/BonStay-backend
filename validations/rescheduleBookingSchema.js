const yup = require("yup");

let prevDayDate = new Date();
prevDayDate.setDate(prevDayDate.getDate() - 1);

const rescheduleBookingSchema = yup.object({
  startDate: yup.date().required().min(prevDayDate),
  endDate: yup.date().required().min(yup.ref("startDate")),
  bookingId: yup.string().required(),
});

module.exports = rescheduleBookingSchema;
