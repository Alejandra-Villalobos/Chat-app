const express = require("express");

const router = express.Router();

const { findByEmail } = require("../controllers/user");

router.get("/email", findByEmail);

module.exports = router;