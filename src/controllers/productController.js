const Product = require("../models/products");
const Category = require("../models/category");

const productController = {
  create: async (req, res) => {
    try {
      const newProduct = new Product({
        ...req.body,
        name: req.body.name.toLowerCase(),
      });
      console.log(newProduct);
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

      res.status(200).json("Cập nhật thành công");
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
      res.status(200).json("Xóa thành công");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  get: async (req, res) => {
    try {
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
      let products = [];
      if (categoryId === undefined) {
        products = await Product.find()
          .limit(limit)
          .populate("category", "name");
      } else {
        products = await Product.find({ category: categoryId })
          .limit(limit)
          .populate("category", "name");
      }

      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  search: async (req, res) => {
    try {
      const keyword = req.query.keyword || undefined;
      let products;
      if (keyword !== undefined) {
        products = await Product.find({
          name: { $regex: ".*" + keyword + ".*" },
        });
      } else {
        products = await Product.find();
      }
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  review: async (req, res) => {
    try {
      const { rating, comment, name, user, avatar } = req.body;
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json("Sản phẩm không tồn tại");
      const review = {
        name,
        comment,
        user,
        avatar,
        rating: Number(rating),
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating = Math.floor(
        product.reviews.reduce((a, b) => a + b.rating, 0) /
          product.reviews.length
      );
      await product.save();
      res.status(200).json("Thêm đánh giá thành công");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = productController;
