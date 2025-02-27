const express = require("express");
const { handleGenerateNewUrl, handleGetAnalyticsById, handleGetLinkById } = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewUrl);
router.get("/:id", handleGetLinkById);
router.get("/analytics/:id", handleGetAnalyticsById);

module.exports = router;
