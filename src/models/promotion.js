const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    expireIn: { type: String, required: true },
    percent: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Promotion", promotionSchema);
