const express = require("express");

const router = express.Router();

const { register, login, loginGoogle, logout, registerGoogle } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/loginGoogle", loginGoogle);
router.post("/logout", logout);
router.post("/registerGoogle", registerGoogle);

module.exports = router;