const orderController = require("../controllers/orderController");
const router = require("express").Router();

router.post("/", orderController.create);
router.put("/:id", orderController.update);
router.get("/:id", orderController.getById);
router.get("/", orderController.getAll);
module.exports = router;
