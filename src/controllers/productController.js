const Product = require("../models/products");
const Category = require("../models/category");

const productController = {
  create: async (req, res) => {
    try {
      //   const { name, price, description, image1, image2, category, countInStock } =
      //     req.body;
      const newProduct = new Product(req.body);
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  edit: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await Product.findOneAndUpdate({ _id: id }, req.body);

      res.status(200).json("Update successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  del: async (req, res) => {
    try {
      const { id } = req.params;
      await Product.findOneAndDelete({ _id: id });
      await Category.findOneAndUpdate(
        { products: id },
        { $pull: { products: id } }
      );
      res.status(200).json("Delete successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  get: async (req, res) => {
    try {
      console.log(req.params);
      const id = req.params.id;
      const product = await Product.findOne({ _id: id }).populate(
        "category",
        "name"
      );
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getAll: async (req, res) => {
    try {
      const { categoryId } = req.query || undefined;
      const limit = req.query.limit || 10;
      // console.log(req.query);
      let products = [];
      if (categoryId === undefined) {
        console.log("in");
        products = await Product.find()
          .limit(limit)
          .populate("category", "name");
      } else {
        console.log("out");
        products = await Product.find({ category: categoryId })
          .limit(limit)
          .populate("category", "name");
      }

      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = productController;
