const Order = require("../models/order");
const { oAuth2Client } = require("../utils/oAuth2");
const nodemailer = require("nodemailer");
const Product = require("../models/products");
const { sendMail } = require("../utils/sendNodemailer");
const dotenv = require("dotenv");
dotenv.config();
const orderController = {
  updateStock: async (id, qty) => {
    const product = await Product.findById(id);
    if (product.countInStock >= qty) {
      product.countInStock -= qty;
      await product.save({ validateBeforeSave: false });
    } else {
      return false;
    }
    return true;
  },
  create: async (req, res) => {
    try {
      const { orderItems } = req.body;
      const newOrder = new Order(req.body);
      let result = [];
      for await (const item of orderItems) {
        const order = await orderController.updateStock(item.product, item.qty);
        result.push(order.toString());
      }
      if (result.indexOf("false") !== -1) {
        res.status(500).json("Không đủ số lượng trong kho");
      } else {
        const saveOrder = await newOrder.save();
        res.status(200).json(saveOrder);
      }
    } catch (error) {
      res.status(500).json(`Error: ${error}`);
    }
  },
  configEmail: (status) => {
    switch (status) {
      case "processing":
        return "Đơn hàng của bạn đã được xác nhận";
      case "shipping":
        return "Đơn hàng của bạn đang được vận chuyển";
      case "completed":
        return "Đơn hàng của bạn đã hoàn tất";
      default:
        return "Bạn đã hủy đơn hàng ";
    }
  },
  update: async (req, res) => {
    try {
      const { status, email } = req.body;
      const id = req.params.id;
      const accessToken = await oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "namb1809152@student.ctu.edu.vn",
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFESH_TOKEN,
          accessToken: accessToken,
        },
      });
      const mail = orderController.configEmail(status);
      const send = await sendMail(transporter, email, mail);
      await Order.findOneAndUpdate({ _id: id }, { $set: { status: status } });
      res.status(200).json("Cập nhật thành công");
    } catch (error) {
      res.status(500).json(`Error: ${error}`);
    }
  },
  getAll: async (req, res) => {
    try {
      const order = await Order.find();
      // res.status(200).json(order);
      res.status(200).json({
        full: order,
        pending: order.filter((item) => item.status === "pending"),
        processing: order.filter((item) => item.status === "processing"),
        shipping: order.filter((item) => item.status === "shipping"),
        completed: order.filter((item) => item.status === "completed"),
        cancelled: order.filter((item) => item.status === "cancelled"),
      });
    } catch (error) {
      res.status(500).json(`Error: ${error}`);
    }
  },
  getByUser: async (req, res) => {
    try {
      const { email } = req.params;
      const order = await Order.find({ "user.email": email });
      res.status(200).json({
        pending: order.filter((item) => item.status === "pending"),
        processing: order.filter((item) => item.status === "processing"),
        shipping: order.filter((item) => item.status === "shipping"),
        completed: order.filter((item) => item.status === "completed"),
        cancelled: order.filter((item) => item.status === "cancelled"),
      });
    } catch (error) {
      res.status(500).json(`Error: ${error}`);
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      for await (const item of order.orderItems) {
        orderController.increStock(item.product, item.qty);
      }
      order.delete();
      res.status(200).json("Xóa thành công");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  increStock: async (id, qty) => {
    const product = await Product.findOne({ _id: id });
    product.countInStock += qty;
    await product.save({ validateBeforeSave: false });
  },
  cancel: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);
      for await (let item of order.orderItems) {
        orderController.increStock(item.product, item.qty);
      }
      const accessToken = await oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "namb1809152@student.ctu.edu.vn",
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFESH_TOKEN,
          accessToken: accessToken,
        },
      });
      const mail = orderController.configEmail("cancelled");
      const send = await sendMail(transporter, order.user?.email, mail);
      await order.updateOne({ status: "cancelled" });
      res.status(200).json("Hủy đơn hàng thành công");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = orderController;
