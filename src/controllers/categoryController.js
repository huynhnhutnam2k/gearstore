const Category = require("../models/category");
const Product = require("../models/products");
const categoryController = {
  create: async (req, res) => {
    try {
      const name = req.body.name;
      const newCategory = new Category({ name });
      const savedCategory = await newCategory.save();

      res.status(200).json(savedCategory);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  edit: async (req, res) => {
    try {
      const { id } = req.params;
      await Category.findByIdAndUpdate(id, req.body);
      await Product.findOneAndUpdate(
        { products: id },
        { $set: { name: req.body.name } }
      );
      res.status(200).json("Cập nhật thành công");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  del: async (req, res) => {
    try {
      await Category.findByIdAndRemove(req.params.id);
      await Product.findOneAndUpdate(
        { category: req.params.id },
        { $set: { category: null } }
      );
      res.status(200).json("Xóa thành công");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;

      const category = await Category.findOne({ _id: id });
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const category = await Category.find();

      res.status(200).json(category);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = categoryController;
