const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HotelsSchema = new Schema(
  {
    hotelName: {
      type: String,
      required: [true],
    },

    description: {
      type: String,
      required: [true],
    },

    amenities: {
      type: String,
      required: [true],
    },

    phoneNo: {
      type: Schema.Types.Number,
      required: [true],
    },

    address: {
      type: String,
      required: [true],
    },

    reviews: {
      type: Schema.Types.Array,
      required: [true],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotels", HotelsSchema)
