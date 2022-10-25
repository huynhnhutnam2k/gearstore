const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Otp = require("../models/otp");
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
        return res.status(400).send({ message: "User already exists" });
      }
      const hashPass = await bcrypt.hash(password, 10);
      const user = new User({
        email,
        password: hashPass,
        username,
        isAdmin,
      });
      await user.save();
      return res.status(200).json({
        message: "User created successfully",
      });
    } catch (error) {
      res.status(404).json(`Error: ${error.message}`);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send("User does not exist");
      }
      const isMatch = await bcrypt.compare(password, user.password);
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
      }
    } catch (error) {
      res.status(500).json(`Error: ${error.message}`);
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
        return res.status(404).json("User not found");
      }
      const validPassword = await bcrypt.compare(
        currentPassword,
        user.password
      );
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
        res.status(200).json("Update success");
      } else {
        res.status(404).json("Current password is incorrect");
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
      const otps = await Otp.findOne({ email: email, otp: otp });
      if (otps) {
        const diff = new Date().getTime() - otps.expiresIn;
        if (diff < 0) {
          return res.status(404).json("Otp is expired");
        }
        // req.passReset = true;
        res.status(200).json("access");
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
};

module.exports = userController;
