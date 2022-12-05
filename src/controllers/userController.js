const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Otp = require("../models/otp");
const ListUser = require("../models/listUserRegister");
const userController = {
  getAll: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(`Error: ${error.message}`);
    }
  },
  register: async (req, res) => {
    try {
      const { email, password, username, isAdmin } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json("Người dùng đã tồn tại");
      }
      const hashPass = await bcrypt.hash(password, 10);
      const user = new User({
        email,
        password: hashPass,
        username,
        isAdmin,
      });
      await user.save();
      return res.status(200).json("Tạo tài khoản thành công");
    } catch (error) {
      res.status(404).json(`Error: ${error.message}`);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json("Tài khoản không tồn tại");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(email, password);
      if (user && isMatch) {
        const token = await jwt.sign(
          { _id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "365d" }
        );
        return res.status(200).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          avatar: user.avatar,
          token,
        });
      } else {
        return res.status(404).json("Email hoặc mật khẩu không đúng");
      }
    } catch (error) {
      res.status(500).json(`Error: ${error}`);
    }
  },
  getOne: (req, res) => {
    try {
      console.log(req);
      // res.json(req);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const { email, username, currentPassword, newPassword } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json("Tài khoản không tồn tại");
      }
      const validPassword = await bcrypt.compare(
        currentPassword,
        user.password
      );
      console.log(req.body);
      if (user && validPassword) {
        const hashPass = await bcrypt.hash(newPassword, 10);
        await user.updateOne(
          {
            $set: {
              username: username,
              password: hashPass,
            },
          },
          { new: true }
        );
        res.status(200).json("Cập nhật thành công");
      } else {
        res.status(404).json("Mật khẩu không đúng");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  delete: (req, res) => {
    res.send("delete");
  },
  reset: async (req, res) => {
    try {
      const { email, otp } = req.body;
      console.log(req.body);
      const otps = await Otp.findOne({ email: email, otp: otp });
      if (otps) {
        const diff = new Date().getTime() - otps.expiresIn;
        if (diff < 0) {
          return res.status(404).json("Otp hết hạn");
        }
        // req.passReset = true;
        res.status(200).json("access");
      } else {
        res.status(404).json("OTP không tồn tại");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  resetAction: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOneAndUpdate(
        { email: email },
        { $set: { password: await bcrypt.hash(password, 10) } },
        {
          new: true,
        }
      );
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  takePromotion: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await ListUser.findOne({ email });
      if (user) return res.status(404).json("Đã đăng ký ");
      const newUser = new ListUser({ email });
      await newUser.save();
      res.status(200).json("Đăng ký nhận khuyến mãi thành công");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
