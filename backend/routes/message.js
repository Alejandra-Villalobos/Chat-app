const express = require("express");

const router = express.Router();

const { create, getAll } = require("../controllers/message");

router.post("/chat/:chatId", create);
router.get("/chat/:chatId", getAll);

module.exports = router;