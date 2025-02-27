const User = require("../models/user");
const { v4: uuid } = require("uuid");
const { setUser } = require("../service/auth");

async function handleGenerateNewUser(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.status(201).redirect("/");
}

async function handleLogin(req, res) {
  const { email, password } = req.body;
  const result = await User.findOne({ email, password });

  if (!result) return res.redirect("login");
  const token = setUser(result);
  res.cookie("uid", token);
  res.redirect("/");
}

module.exports = { handleGenerateNewUser, handleLogin };
