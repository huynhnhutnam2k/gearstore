const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
      console.log(process.env.JWT_SECRET);
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send("User does not exist");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (user && isMatch) {
        const token = await jwt.sign(
          { _id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        return res.status(200).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          token,
        });
      }
    } catch (error) {
      res.status(500).json(`Error: ${error.message}`);
    }
  },
  getOne: (req, res) => {
    res.send("getOne");
  },
  update: (req, res) => {
    res.send("update");
  },
  delete: (req, res) => {
    res.send("delete");
  },
};

module.exports = userController;
