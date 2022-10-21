const Order = require("../models/order");
const { oAuth2Client } = require("../utils/oAuth2");
const nodemailer = require("nodemailer");
const { sendMail } = require("../utils/sendNodemailer");
const orderController = {
  create: async (req, res) => {
    try {
      const { user, email, phone, orderItems, totalPrice, shippingAddress } =
        req.body;
      if (orderItems && orderItems.length === 0) {
        res.status(404);
        throw new Error("No item in order");
        return;
      } else {
        const newOrder = await new Order({
          user,
          email,
          phone,
          orderItems,
          totalPrice,
          shippingAddress,
        });
        const saveOrder = await newOrder.save();
        res.status(200).json(saveOrder);
      }
    } catch (error) {
      res.status(500).json(`Error: ${error}`);
    }
  },
  update: async (req, res) => {
    try {
      const status = req.body.status;
      const userId = req.body.userId;
      const id = req.params.id;
      const { email } = await User.findOne({ _id: userId });
      const accessToken = await oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "namb1809152@student.ctu.edu.vn",
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
      const send = await sendMail(transporter, email);
      await Order.findOneAndUpdate({ _id: id }, { $set: { status: status } });
      res.status(200).json("Update success");
    } catch (error) {
      res.status(500).json(`Error: ${error}`);
    }
  },
  getAll: async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json(`Error: ${error}`);
    }
  },
  getByUser: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.find({ user: id });
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(`Error: ${error}`);
    }
  },
};
module.exports = orderController;
