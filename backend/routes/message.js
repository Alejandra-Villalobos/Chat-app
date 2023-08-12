const express = require("express");

const router = express.Router();

const { create } = require("../controllers/message");

router.post("/chat/:chatId", create);

module.exports = router;