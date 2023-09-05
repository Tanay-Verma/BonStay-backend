const yup = require("yup");

let prevDayDate = new Date();
prevDayDate.setDate(prevDayDate.getDate() - 1);

const bookARoomSchema = yup.object({
  startDate: yup.date().required().min(prevDayDate),
  endDate: yup.date().required().min(yup.ref("startDate")),
  noOfPersons: yup.number().required().min(1).max(5),
  noOfRooms: yup.number().required().min(1).max(3),
  typeOfRoom: yup.string().required().oneOf(["AC", "Non AC"]),
});

module.exports = bookARoomSchema;
