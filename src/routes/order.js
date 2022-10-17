const orderController = require("../controllers/orderController");
const router = require("express").Router();
const { verifyTokenAdmin } = require("../middlewares/auth");
router.post("/", orderController.create);
router.put("/:id", verifyTokenAdmin, orderController.update);
router.get("/:id", orderController.getByUser);
router.get("/", orderController.getAll);
module.exports = router;
