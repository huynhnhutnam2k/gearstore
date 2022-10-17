const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const { verifyTokenAdmin } = require("../middlewares/auth");
router.post("/", verifyTokenAdmin, categoryController.create);
router.put("/:id", verifyTokenAdmin, categoryController.edit);
router.delete("/:id", verifyTokenAdmin, categoryController.del);
router.get("/:id", categoryController.get);
router.get("/", categoryController.getAll);
module.exports = router;
