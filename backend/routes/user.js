const express = require("express");
const { pool } = require("../utils/db");

const router = express.Router();

const { registerUser, loginUser, findAllUsers, logout } = require("../controllers/user");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all", findAllUsers)
router.post("/logout", logout)


module.exports = router;