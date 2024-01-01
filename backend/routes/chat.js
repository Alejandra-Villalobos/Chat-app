const express = require("express");

const router = express.Router();

const { create, getAllWithName, getOneFromId, verifyExists } = require("../controllers/chat");

router.post("/chat", create);
router.get("/chat", getAllWithName);
router.get("/chat/:chatId", getOneFromId);
router.post("/verifyChat", verifyExists);

module.exports = router;