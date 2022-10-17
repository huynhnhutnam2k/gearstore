const router = require("express").Router();
const productController = require("../controllers/productController");
const { verifyTokenAdmin, verifyTokenUser } = require("../middlewares/auth");
router.post("/", verifyTokenAdmin, productController.create);
router.put("/:id", verifyTokenAdmin, productController.edit);
router.delete("/:id", verifyTokenAdmin, productController.del);
router.get("/:id", productController.get);
router.get("/", productController.getAll);
module.exports = router;
