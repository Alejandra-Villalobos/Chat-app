const express = require("express");
const { pool } = require("../utils/db");

const router = express.Router();

const { registerUser, loginUser, findAllUsers } = require("../controllers/user");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all", findAllUsers)

module.exports = router;