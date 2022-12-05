const Promotion = require("../models/promotion");
const ListUser = require("../models/listUserRegister");
const { oAuth2Client } = require("../utils/oAuth2");
const { sendMail } = require("../utils/sendNodemailer");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();
const promotionController = {
  create: async (req, res) => {
    try {
      const { code, expireIn, percent } = req.body;
      const newPromotion = new Promotion({
        ...req.body,
        code: code.toLowerCase(),
        expireIn: new Date().getTime() + 86400 * expireIn * 1000,
      });
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
      const mail = `Your promotion is ${code}`;
      const listUser = await ListUser.find();
      for await (const user of listUser) {
        const send = await sendMail(transporter, user.email, mail);
      }
      await newPromotion.save();
      res.status(200).json(newPromotion);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const promotion = await Promotion.findOne({ _id: id });

      if (!promotion) {
        return res.status(404).json("Voucher không tồn tại");
      }
      await promotion.updateOne({ $set: req.body });
      res.status(200).json("Cập nhật thành công");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const promotion = await Promotion.findById(id);
      if (!promotion) return res.status(404).json("Voucher không tồn tại");
      await promotion.delete();
      res.status(200).json("Xóa thành công");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const promotion = await Promotion.findById(id);
      const valid = new Date().getTime() - +promotion.expireIn < 0;
      const response = {
        ...promotion._doc,
        valid,
      };
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const promotions = await Promotion.find();
      res.status(200).json(promotions);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getByCode: async (req, res) => {
    try {
      const { code } = req.body;
      console.log(req.body);
      const promotion = await Promotion.findOne({ code: code.toLowerCase() });
      if (!promotion) {
        return res.status(404).json("Voucher không tồn tại");
      }
      const valid = new Date().getTime() - +promotion.expireIn < 0;
      const response = {
        ...promotion._doc,
        valid,
      };
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = promotionController;
