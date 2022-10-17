const router = require("express").Router();
const messageController = require("../controllers/messageController");
router.post("/", messageController.add);
router.get("/", messageController.get);
module.exports = router;
