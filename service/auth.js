const jwt = require("jsonwebtoken");
const key = "Ichimonji2216";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    key
  );
}

function getUser(token) {
  if (!token || typeof token !== "string") {
    console.error("Invalid or missing token");
    return null;
  }
  try {
    return jwt.verify(token, key);
  } catch (err) {
    console.error("Error verifying token:", err.message);
    return null;
  }
}

module.exports = { setUser, getUser };
