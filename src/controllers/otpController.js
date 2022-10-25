const makeOTP = require("../utils/makeOTP");
const Otp = require("../models/otp");
const User = require("../models/user");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const { oAuth2Client } = require("../utils/oAuth2");
const { sendMail } = require("../utils/sendNodemailer");
dotenv.config();
const otpController = {
  create: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json("User not found");
      }
      const code = makeOTP();
      const otp = await new Otp({
        expireIn: new Date().getTime() + 300 * 1000,
        email,
        code: code,
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
      const mail = `Your otp is ${code}`;
      const send = await sendMail(transporter, email, mail);
      await otp.save();
      res.status(200).json(otp);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = otpController;
