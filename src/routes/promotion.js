const router = require("express").Router();
const promotionController = require("../controllers/promotionController");

router.post("/", promotionController.create);
router.put("/:id", promotionController.update);
router.delete("/:id", promotionController.delete);
router.post("/code", promotionController.getByCode);
router.get("/:id", promotionController.get);
router.get("/", promotionController.getAll);
module.exports = router;
