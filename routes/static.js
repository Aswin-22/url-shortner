const express = require("express");
const Url = require("../models/url");
const User = require("../models/user");
const { restrictTo } = require("../middleware/auth");
const router = express.Router();

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  if (!req.user) return res.redirect("/login");
  try {
    const result = await Url.find().populate("createdBy", "name").exec();
    return res.render("admin", { urls: result });
  } catch (err) {
    console.error("Error fetching URLs:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const result = await Url.find({ createdBy: req.user._id });
  return res.render("home", { urls: result });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
