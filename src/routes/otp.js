const router = require("express").Router();
const otpController = require("../controllers/otpController");
router.post("/", otpController.create);

module.exports = router;
