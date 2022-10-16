const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
router.post("/", categoryController.create);
router.put("/:id", categoryController.edit);
router.delete("/:id", categoryController.del);
router.get("/:id", categoryController.get);
router.get("/", categoryController.getAll);
module.exports = router;
