const express = require("express");

const router = express.Router();

const { create, getAllWithName } = require("../controllers/chat");

router.post("/chat", create);
router.get("/chat", getAllWithName);

module.exports = router;