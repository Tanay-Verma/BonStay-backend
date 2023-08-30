const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingsSchema = new Schema(
  {
    startDate: {
      type: Schema.Types.Date,
      required: [true],
    },

    endDate: {
      type: Schema.Types.Date,
      required: [true],
    },

    noOfPersons: {
      type: Schema.Types.Number,
      required: [true],
    },

    noOfRooms: {
      type: Schema.Types.Number,
      required: [true],
    },

    typeOfRoom: {
      type: String,
      required: [true],
    },

    hotelName: {
      type: String,
      required: [true],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bookings", BookingsSchema);
