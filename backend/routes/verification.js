const express = require("express");

const router = express.Router();

const { verifyCode, deactivateCode } = require("../controllers/verification");

router.get("/verification", verifyCode);
router.put("/verification", deactivateCode);

module.exports = router;