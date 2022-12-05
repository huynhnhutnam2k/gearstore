const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      // type: mongoose.Schema.Types.ObjectId,
      // required: true,
      // ref: "User",
      name: { type: String },
      email: { type: String },
      phone: { type: String },
      _id: { type: String },
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: [String],
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: { type: String },
      city: { type: String },
      districts: { type: String },
      ward: { type: String },
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipping", "completed", "cancelled"],
      default: "pending",
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
