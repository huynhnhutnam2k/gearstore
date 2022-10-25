const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema(
  {
    expireIn: Number,
    code: String,
    email: String,
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("otp", OtpSchema);
