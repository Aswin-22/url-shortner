const express = require("express");
const { handleGenerateNewUser, handleLogin } = require("../controllers/user");

const router = express.Router();

router.post("/signup", handleGenerateNewUser);
router.post("/login", handleLogin);

module.exports = router;
