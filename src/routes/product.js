const router = require("express").Router();
const productController = require("../controllers/productController");
router.post("/", productController.create);
router.put("/:id", productController.edit);
router.delete("/:id", productController.del);
router.get("/:id", productController.get);
router.get("/", productController.getAll);
module.exports = router;
