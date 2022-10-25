const orderController = require("../controllers/orderController");
const router = require("express").Router();
const { verifyTokenAdmin, verifyTokenUser } = require("../middlewares/auth");
router.post("/", verifyTokenUser, orderController.create);
router.put("/:id", verifyTokenAdmin, orderController.update);
router.get("/cancel/:id", verifyTokenUser, orderController.cancel);
router.delete("/:id", verifyTokenAdmin, orderController.delete);
router.get("/:id", orderController.getById);
router.get("/email/:email", orderController.getByUser);
router.get("/", orderController.getAll);
module.exports = router;