const express = require("express");

const router = express.Router();

const { verifyCode, deactivateCode, verifyAccountStatus } = require("../controllers/verification");

router.post("/verification", verifyCode);
router.post("/accountStatus", verifyAccountStatus);
router.put("/verification", deactivateCode);

module.exports = router;