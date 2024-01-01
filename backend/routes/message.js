const express = require("express");

const router = express.Router();

const { create, getAll, editVisibility } = require("../controllers/message");

router.post("/message/:chatId", create);
router.get("/message/:chatId", getAll);
router.put("/message/:messageId", editVisibility);

module.exports = router;