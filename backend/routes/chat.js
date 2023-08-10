const express = require("express");

const router = express.Router();

const { create } = require("../controllers/chat");

router.post("/chat", create);

module.exports = router;