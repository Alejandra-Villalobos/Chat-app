const express = require("express");

const router = express.Router();

const { create, getAllWithName, getOneFromId } = require("../controllers/chat");

router.post("/chat", create);
router.get("/chat", getAllWithName);
router.get("/oneChat/:chatId", getOneFromId);

module.exports = router;