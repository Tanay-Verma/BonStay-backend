const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true],
    },

    address: {
      type: String,
      required: [true],
    },

    emailId: {
      type: String,
      required: [true],
      unique: true,
    },

    phoneNo: {
      type: Schema.Types.Number,
      required: [true],
    },

    password: {
      type: String,
      required: [true],
      minlength: 6,
      maxlength: 15,
    },

    userBookings: {
      type: [Schema.Types.ObjectId],
    },

    hotelsStayedAt: {
      type: Schema.Types.Array,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

UserSchema.methods.comparePassword = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("User", UserSchema);
