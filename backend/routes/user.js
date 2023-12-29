const express = require("express");

const router = express.Router();

const { findByEmail, findAllUsersFilter } = require("../controllers/user");

router.get("/email", findByEmail);
router.get("/emailFilter", findAllUsersFilter);

module.exports = router;